// Zero-G Mail — Gmail REST API Module
const GMAIL_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

// ---- Fetch Email List ----
async function fetchEmails(maxResults = 20) {
  const token = getAccessToken();
  if (!token) return [];
  try {
    const res = await fetch(
      `${GMAIL_BASE}/messages?maxResults=${maxResults}&q=in:inbox`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!data.messages) return [];
    // Fetch details in parallel (batch of 8)
    const batches = [];
    for (let i = 0; i < data.messages.length; i += 8) {
      batches.push(data.messages.slice(i, i + 8));
    }
    const emails = [];
    for (const batch of batches) {
      const details = await Promise.all(
        batch.map(m => fetchEmailDetails(m.id))
      );
      emails.push(...details.filter(Boolean));
    }
    return emails;
  } catch (e) {
    console.error('fetchEmails error:', e);
    return [];
  }
}

// ---- Fetch Single Email Detail ----
async function fetchEmailDetails(messageId) {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const res = await fetch(
      `${GMAIL_BASE}/messages/${messageId}?format=full`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    return parseGmailMessage(data);
  } catch (e) {
    console.error('fetchEmailDetails error:', e);
    return null;
  }
}

// ---- Parse Gmail Message → App Format ----
function parseGmailMessage(msg) {
  const headers = {};
  (msg.payload?.headers || []).forEach(h => {
    headers[h.name.toLowerCase()] = h.value;
  });

  const from = headers['from'] || 'Unknown';
  const senderName = from.replace(/<[^>]+>/, '').trim().replace(/"/g, '') || from.split('@')[0];
  const senderEmail = (from.match(/<([^>]+)>/) || [, from])[1];
  const initials = senderName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const subject = headers['subject'] || '(ไม่มีหัวข้อ)';
  const date = new Date(parseInt(msg.internalDate));
  const time = date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  const dateStr = date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });

  const bodyData = extractBody(msg.payload);
  const body = bodyData.text;
  const bodyHtml = bodyData.html;
  const snippet = msg.snippet || '';
  const score = computePriorityScore(msg, headers, body);
  const category = classifyEmail(headers, body, subject);
  const styleData = getScoreStyle(score);

  return {
    id: msg.id,
    threadId: msg.threadId,
    sender: senderName,
    email: senderEmail,
    initials,
    subject,
    time,
    dateStr,
    body,
    bodyHtml,
    snippet,
    score,
    category: category.key,
    categoryLabel: category.label,
    ...styleData,
    // AI fields populated later
    summary: snippet,
    keyPoints: [],
    actions: [],
    suggestedReply: '',
    aiLoaded: false,
  };
}

// ---- Extract Email Body from MIME ----
function extractBody(payload) {
  const result = { text: '', html: '' };
  if (!payload) return result;
  _extractBodyParts(payload, result);
  return result;
}

function _extractBodyParts(payload, result) {
  if (payload.mimeType === 'text/plain' && payload.body?.data && !result.text) {
    result.text = atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
  }
  if (payload.mimeType === 'text/html' && payload.body?.data && !result.html) {
    result.html = atob(payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
    if (!result.text) result.text = result.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  if (payload.parts) {
    for (const part of payload.parts) _extractBodyParts(part, result);
  }
}

// ---- Heuristic Priority Scoring ----
function computePriorityScore(msg, headers, body) {
  let score = 30; // base

  const subj = (headers['subject'] || '').toLowerCase();
  const bodyLow = body.toLowerCase();

  // Urgency keywords (Thai + English)
  const urgentKW = ['urgent', 'asap', 'immediately', 'ด่วน', 'เร่งด่วน', 'โปรด', 'กรุณา', 'approval', 'อนุมัติ', 'deadline', 'due'];
  const importantKW = ['invoice', 'payment', 'ใบแจ้ง', 'สัญญา', 'contract', 'meeting', 'ประชุม', 'review', 'feedback', 'ตรวจสอบ'];
  const spamKW = ['unsubscribe', 'click here', 'free offer', 'promotion', 'newsletter', 'no-reply'];

  urgentKW.forEach(kw => { if (subj.includes(kw) || bodyLow.includes(kw)) score += 15; });
  importantKW.forEach(kw => { if (subj.includes(kw) || bodyLow.includes(kw)) score += 8; });
  spamKW.forEach(kw => { if (bodyLow.includes(kw)) score -= 20; });

  // Labels
  const labels = msg.labelIds || [];
  if (labels.includes('IMPORTANT')) score += 20;
  if (labels.includes('STARRED')) score += 15;
  if (labels.includes('SPAM')) score -= 40;
  if (labels.includes('CATEGORY_PROMOTIONS')) score -= 25;
  if (labels.includes('CATEGORY_SOCIAL')) score -= 10;

  // Direct email (not CC/BCC)
  if (headers['to'] && !headers['cc']) score += 10;

  return Math.max(1, Math.min(100, Math.round(score)));
}

// ---- Email Category Classification ----
function classifyEmail(headers, body, subject) {
  const labels = [];
  const subj = subject.toLowerCase();
  const bodyLow = body.toLowerCase();

  if (subj.includes('invoice') || subj.includes('payment') || bodyLow.includes('ใบแจ้งหนี้') || bodyLow.includes('ชำระเงิน'))
    return { key: 'Finance', label: 'การเงิน' };
  if (subj.includes('meeting') || subj.includes('agenda') || bodyLow.includes('ประชุม'))
    return { key: 'Work', label: 'งาน' };
  if (bodyLow.includes('unsubscribe') || bodyLow.includes('promotion') || bodyLow.includes('offer'))
    return { key: 'Promotion', label: 'โปรโมชัน' };
  if (subj.includes('urgent') || subj.includes('ด่วน') || subj.includes('asap'))
    return { key: 'Important', label: 'ด่วนมาก' };

  return { key: 'Work', label: 'ทั่วไป' };
}

// ---- Send Email via Gmail API ----
async function sendReply(threadId, to, subject, body) {
  const token = getAccessToken();
  if (!token) return false;

  const raw = btoa(
    `To: ${to}\r\nSubject: Re: ${subject}\r\nContent-Type: text/plain; charset=utf-8\r\n\r\n${body}`
  ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  try {
    const res = await fetch(`${GMAIL_BASE}/messages/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw, threadId }),
    });
    return res.ok;
  } catch (e) {
    console.error('sendReply error:', e);
    return false;
  }
}
