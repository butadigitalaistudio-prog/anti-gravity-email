// Zero-G Mail — Shared Navigation Logic
// basePath: '' for root pages, '../' for pages inside /pages/
function getNavItems(basePath) {
  return [
    { icon: 'dashboard',    label: 'แดชบอร์ด',         href: basePath + 'index.html' },
    { icon: 'auto_awesome', label: 'อินบ็อกซ์ AI',      href: basePath + 'pages/inbox.html' },
    { icon: 'star',         label: 'ลำดับความสำคัญ',    href: basePath + 'pages/priority.html' },
    { icon: 'folder_open',  label: 'หมวดหมู่',           href: basePath + 'pages/categories.html' },
    { icon: 'insights',     label: 'การวิเคราะห์',      href: basePath + 'pages/analytics.html' },
    { icon: 'settings',     label: 'ตั้งค่า',            href: basePath + 'pages/settings.html' },
  ];
}

function renderSideNav(activePage, basePath) {
  basePath = basePath || '';
  const NAV_ITEMS = getNavItems(basePath);
  const nav = document.getElementById('side-nav');
  if (!nav) return;
  nav.innerHTML = `
    <div class="px-8 mb-12">
      <h1 class="text-2xl font-bold tracking-tighter text-white">Zero-G Mail</h1>
      <p class="text-xs text-slate-400 mt-1 uppercase tracking-widest">Weightless Intel</p>
    </div>
    <nav class="flex-1 space-y-2 px-4">
      ${NAV_ITEMS.map(item => {
        const isActive = item.label === activePage;
        return `<a href="${item.href}" class="flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-300 ${
          isActive
            ? 'text-violet-400 font-bold bg-violet-400/10'
            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
        }">
          <span class="material-symbols-outlined">${item.icon}</span>
          <span>${item.label}</span>
        </a>`;
      }).join('')}
    </nav>
    <div class="px-6 mt-auto">
      <button class="w-full premium-gradient text-on-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-violet-400/20 active:scale-95 transition-transform">
        <span class="material-symbols-outlined">edit</span>
        เขียนเมล
      </button>
      <div class="mt-6 flex items-center gap-3 px-2">
        <div class="w-10 h-10 rounded-full bg-[#2d3449] overflow-hidden flex items-center justify-center">
          <span class="material-symbols-outlined text-slate-400">account_circle</span>
        </div>
        <div>
          <span class="text-sm font-bold text-white block">Alex Chen</span>
          <span class="text-[10px] text-slate-500">Premium Plan</span>
        </div>
      </div>
    </div>
  `;
}
