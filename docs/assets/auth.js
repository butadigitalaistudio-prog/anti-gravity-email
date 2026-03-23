// Zero-G Mail — Google OAuth Authentication
// Replace YOUR_CLIENT_ID with your actual Google OAuth Client ID
const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';

const GMAIL_SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
].join(' ');

let tokenClient = null;
let currentToken = null;

// ---- Token Management ----
function saveToken(token) {
  currentToken = token;
  sessionStorage.setItem('zg_token', JSON.stringify({
    access_token: token.access_token,
    expires_at: Date.now() + (token.expires_in * 1000),
  }));
}

function loadToken() {
  const raw = sessionStorage.getItem('zg_token');
  if (!raw) return null;
  const t = JSON.parse(raw);
  if (Date.now() > t.expires_at - 60000) { sessionStorage.removeItem('zg_token'); return null; }
  currentToken = t;
  return t;
}

function getAccessToken() {
  if (currentToken && currentToken.access_token) return currentToken.access_token;
  const stored = loadToken();
  return stored ? stored.access_token : null;
}

function isSignedIn() { return !!getAccessToken(); }

// ---- Initialize Google Identity Services ----
function initGoogleAuth(onSignInCallback) {
  if (!window.google) { console.error('GIS library not loaded'); return; }

  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: GMAIL_SCOPES,
    callback: (response) => {
      if (response.error) { console.error('OAuth error:', response); return; }
      saveToken(response);
      if (onSignInCallback) onSignInCallback(response);
    },
  });

  // Auto-restore session
  const stored = loadToken();
  if (stored && onSignInCallback) onSignInCallback(stored);
}

// ---- Sign In ----
function signIn() {
  if (!tokenClient) { alert('กรุณารอให้ Google Auth โหลดเสร็จก่อน'); return; }
  tokenClient.requestAccessToken({ prompt: '' });
}

// ---- Sign Out ----
function signOut() {
  const token = getAccessToken();
  if (token) google.accounts.oauth2.revoke(token, () => {});
  sessionStorage.removeItem('zg_token');
  currentToken = null;
  window.location.reload();
}

// ---- Get User Profile ----
async function getUserProfile() {
  const token = getAccessToken();
  if (!token) return null;
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await res.json();
  } catch (e) { console.error('Profile fetch error:', e); return null; }
}

// ---- Render Auth Button ----
function renderAuthButton(containerId, onSignIn) {
  initGoogleAuth(async (token) => {
    const profile = await getUserProfile();
    updateAuthUI(containerId, true, profile);
    if (onSignIn) onSignIn(token);
  });

  const container = document.getElementById(containerId);
  if (!container) return;

  if (isSignedIn()) {
    getUserProfile().then(p => updateAuthUI(containerId, true, p));
  } else {
    updateAuthUI(containerId, false, null);
  }
}

function updateAuthUI(containerId, loggedIn, profile) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (loggedIn && profile) {
    container.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${profile.picture}" class="w-8 h-8 rounded-full border border-primary/30" alt="${profile.name}"/>
        <div class="hidden lg:block text-left">
          <p class="text-xs font-bold text-on-surface leading-none">${profile.name}</p>
          <p class="text-[10px] text-on-surface-variant leading-none mt-0.5">${profile.email}</p>
        </div>
        <button onclick="signOut()" class="text-[10px] text-outline hover:text-error transition-colors ml-1" title="ออกจากระบบ">
          <span class="material-symbols-outlined text-sm">logout</span>
        </button>
      </div>`;
  } else {
    container.innerHTML = `
      <button onclick="signIn()" class="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-bright text-on-surface border border-white/5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95">
        <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        เข้าสู่ระบบด้วย Google
      </button>`;
  }
}
