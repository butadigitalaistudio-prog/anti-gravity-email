// Zero-G Mail — Gemini AI Summarization Module
// Replace YOUR_GEMINI_API_KEY with your actual key from https://aistudio.google.com/
const GEMINI_API_KEY = 'AIzaSyBTu1Scm3zEP_D2jLFN8vX6ijTGN06Y1dQ';
const GEMINI_API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function callGemini(prompt) {
  try {
    const res = await fetch(GEMINI_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 512 },
      }),
    });
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (e) {
    console.error('Gemini API error:', e);
    return '';
  }
}

// ---- Summarize Email ----
async function summarizeEmail(emailBody, subject, sender) {
  const prompt = `คุณเป็นผู้ช่วย AI อีเมลภาษาไทยชื่อ "Zero-G Intel"
วิเคราะห์อีเมลนี้และตอบในภาษาไทย:

ผู้ส่ง: ${sender}
หัวข้อ: ${subject}
เนื้อหา: ${emailBody.slice(0, 2000)}

กรุณาตอบในรูปแบบ JSON ดังนี้:
{
  "summary": "สรุปใน 1-2 ประโยค",
  "keyPoints": ["จุดสำคัญ 1", "จุดสำคัญ 2", "จุดสำคัญ 3"],
  "actions": ["งานที่ต้องทำ 1", "งานที่ต้องทำ 2"],
  "urgencyNote": "หมายเหตุความเร่งด่วน (ถ้ามี)"
}`;

  const raw = await callGemini(prompt);
  try {
    const json = JSON.parse(raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
    return json;
  } catch {
    return {
      summary: raw.slice(0, 200) || 'ไม่สามารถสรุปได้',
      keyPoints: [],
      actions: [],
      urgencyNote: '',
    };
  }
}

// ---- Suggest Reply ----
async function suggestReply(emailBody, subject, sender) {
  const prompt = `คุณเป็นผู้ช่วย AI เขียนอีเมลมืออาชีพภาษาไทย
เขียนตอบกลับอีเมลนี้ให้กระชับ สุภาพ และเป็นมืออาชีพ ใช้ภาษาไทย:

ผู้ส่ง: ${sender}
หัวข้อ: ${subject}
เนื้อหา: ${emailBody.slice(0, 1000)}

ตอบกลับประมาณ 3-5 ประโยค เริ่มด้วย "เรียน" และลงท้ายด้วย "ขอแสดงความนับถือ"`;

  return await callGemini(prompt);
}

// ---- Analyze Inbox ----
async function analyzeInboxDigest(emails) {
  if (!emails.length) return null;
  const top5 = emails.slice(0, 5).map(e => `- ${e.sender}: ${e.subject} (score: ${e.score})`).join('\n');
  const prompt = `คุณเป็น AI ผู้ช่วยจัดการอีเมล ภาษาไทย
วิเคราะห์อีเมลสำคัญวันนี้และสรุปเป็น headline น่าสนใจ:

${top5}

ตอบเป็น JSON:
{
  "headline": "หัวข้อสรุปสถานการณ์วันนี้ (น่าสนใจ ดราม่าน้อย แต่ตรงประเด็น)",
  "keyPoints": ["ประเด็น 1", "ประเด็น 2", "ประเด็น 3"]
}`;

  const raw = await callGemini(prompt);
  try {
    return JSON.parse(raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
  } catch {
    return { headline: raw.slice(0, 100), keyPoints: [] };
  }
}
