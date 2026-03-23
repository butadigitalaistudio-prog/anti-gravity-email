---
name: zero_g_ui
description: Build UI components and pages for the Anti-Gravity email assistant using the Zero-G Interface Design System from Stitch. Use this skill whenever creating, editing, or reviewing any frontend UI for this project.
---

# Skill: Zero-G Interface — Anti-Gravity Email UI

## ภาพรวม
ทุกครั้งที่สร้างหรือแก้ไข UI ของโปรเจค Anti-Gravity ต้องใช้ **Zero-G Design System** จาก Stitch โดยเคร่งครัด

---

## Step 1: Setup Tailwind Config

ทุกไฟล์ HTML หรือ React project ต้องมี Tailwind config ต่อไปนี้:

```js
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary":                  "#d0bcff",
        "secondary":                "#adc6ff",
        "tertiary":                 "#ffb869",
        "on-primary":               "#3c0091",
        "secondary-container":      "#0566d9",
        "on-secondary-container":   "#e6ecff",
        "tertiary-container":       "#ca801e",
        "surface":                  "#0b1326",
        "background":               "#0b1326",
        "surface-dim":              "#0b1326",
        "surface-container-lowest": "#060e20",
        "surface-container-low":    "#131b2e",
        "surface-container":        "#171f33",
        "surface-container-high":   "#222a3d",
        "surface-container-highest":"#2d3449",
        "surface-bright":           "#31394d",
        "surface-variant":          "#2d3449",
        "on-surface":               "#dae2fd",
        "on-background":            "#dae2fd",
        "on-surface-variant":       "#cbc3d7",
        "primary-fixed":            "#e9ddff",
        "primary-container":        "#a078ff",
        "error":                    "#ffb4ab",
        "error-container":          "#93000a",
        "on-error-container":       "#ffdad6",
        "outline":                  "#958ea0",
        "outline-variant":          "#494454",
        "inverse-primary":          "#6d3bd7",
      },
      fontFamily: {
        "headline": ["Manrope", "Noto Sans Thai"],
        "body":     ["Inter", "Noto Sans Thai"],
        "label":    ["Inter", "Noto Sans Thai"],
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg":      "2rem",
        "xl":      "3rem",
        "full":    "9999px",
      },
    },
  },
}
```

---

## Step 2: Google Fonts (ต้องใส่ใน `<head>`)

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
```

---

## Step 3: Global CSS Classes (ใส่ใน `<style>`)

```css
/* Material Symbols */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Glass Panel — สำหรับ Modals, Floating Hub */
.glass-panel {
  background: rgba(23, 31, 51, 0.6);
  backdrop-filter: blur(20px);
}

/* Premium Gradient — สำหรับ Primary CTA buttons */
.premium-gradient {
  background: linear-gradient(135deg, #d0bcff 0%, #0566d9 100%);
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(208, 188, 255, 0.1); border-radius: 10px; }
```

---

## Step 4: HTML Shell (ทุกหน้าต้องเริ่มด้วย)

```html
<!DOCTYPE html>
<html class="dark" lang="th">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>Zero-G Mail | [ชื่อหน้า]</title>
  <!-- Tailwind + Fonts + Config ตาม Step 1-3 -->
</head>
<body class="bg-surface text-on-surface font-body selection:bg-primary/30">

  <!-- Background Atmosphere Glows -->
  <div class="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
  <div class="fixed bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-secondary-container/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>

  <!-- SideNavBar (Step 5) -->
  <!-- TopNavBar (Step 6) -->
  <!-- Main Content (Step 7+) -->
  <!-- Floating AI Hub (Step 8) -->

</body>
</html>
```

---

## Step 5: SideNavBar Component

```html
<aside class="h-screen w-64 fixed left-0 top-0 bg-[#0b1326] flex flex-col py-8 z-50 font-headline tracking-tight">
  <!-- Logo -->
  <div class="px-8 mb-12">
    <h1 class="text-2xl font-bold tracking-tighter text-white">Zero-G Mail</h1>
    <p class="text-xs text-slate-400 mt-1 uppercase tracking-widest">Weightless Intel</p>
  </div>

  <!-- Navigation Links -->
  <nav class="flex-1 space-y-2 px-4">
    <!-- INACTIVE item -->
    <a class="flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-slate-200 transition-colors hover:bg-white/5 rounded-r-full" href="#">
      <span class="material-symbols-outlined">dashboard</span>
      <span>แดชบอร์ด</span>
    </a>

    <!-- ACTIVE item (เพิ่ม class เหล่านี้) -->
    <a class="flex items-center gap-4 px-4 py-3 text-violet-400 font-bold bg-violet-400/10 rounded-r-full" href="#">
      <span class="material-symbols-outlined">auto_awesome</span>
      <span>อินบ็อกซ์ AI</span>
    </a>
    <!-- เพิ่ม items อื่นๆ: star=Priority, folder_open=Categories, insights=Analytics, settings=Settings -->
  </nav>

  <!-- Bottom: Compose + User Profile -->
  <div class="px-6 mt-auto">
    <button class="w-full premium-gradient text-on-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-95 transition-transform">
      <span class="material-symbols-outlined">edit</span>
      เขียนเมล
    </button>
    <div class="mt-6 flex items-center gap-3 px-2">
      <div class="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
        <img alt="[User name] profile" class="w-full h-full object-cover" src="[avatar-url]"/>
      </div>
      <div>
        <span class="text-sm font-bold text-white">[User Name]</span>
        <span class="text-[10px] text-slate-500 block">Premium Plan</span>
      </div>
    </div>
  </div>
</aside>
```

---

## Step 6: TopNavBar Component

```html
<header class="fixed top-0 right-0 left-64 h-20 bg-[#0b1326]/60 backdrop-blur-xl flex items-center justify-between px-12 z-40 shadow-2xl shadow-black/20 font-headline text-sm font-medium">
  <div class="flex items-center gap-8">
    <!-- Optional: Search input -->
    <div class="relative">
      <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
      <input class="bg-surface-container-lowest border-none rounded-full py-2 pl-10 pr-6 w-64 text-on-surface focus:ring-1 focus:ring-primary transition-all" placeholder="ค้นหา..." type="text"/>
    </div>
    <!-- Stats tabs -->
    <div class="flex items-center gap-6">
      <span class="text-violet-300 border-b-2 border-violet-400 py-2">สำคัญ: 12</span>
      <span class="text-slate-400 hover:text-white transition-colors cursor-default">ทั้งหมด: 124</span>
      <span class="text-slate-400 hover:text-white transition-colors cursor-default">รอดำเนินการ: 5</span>
    </div>
  </div>
  <div class="flex items-center gap-6">
    <button class="premium-gradient px-6 py-2 rounded-full text-on-primary font-bold hover:shadow-[0_0_20px_rgba(208,188,255,0.4)] transition-all">
      ✨ สรุปภาพรวมวันนี้
    </button>
    <span class="material-symbols-outlined text-slate-400 cursor-pointer hover:text-white">notifications</span>
    <span class="material-symbols-outlined text-slate-400 cursor-pointer hover:text-white">account_circle</span>
  </div>
</header>
```

---

## Step 7: Page Content Wrapper

```html
<main class="ml-64 min-h-screen relative pb-24">
  <div class="pt-28 px-12 max-w-7xl mx-auto space-y-12">
    <!-- Page content here -->
  </div>
</main>
```

---

## Step 8: Floating AI Gravity Hub (ทุกหน้าต้องมี)

```html
<div class="fixed bottom-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-4 rounded-xl flex items-center gap-8 z-50 shadow-2xl shadow-black/40 border border-white/5">
  <button class="flex items-center gap-2 text-primary font-bold px-4 py-2 hover:bg-primary/10 rounded-lg transition-all">
    <span class="material-symbols-outlined">mic</span>
    สั่งการด้วยเสียง
  </button>
  <div class="w-[1px] h-6 bg-outline-variant/30 mx-2"></div>
  <button class="flex items-center gap-2 text-on-surface-variant font-bold px-4 py-2 hover:bg-white/5 rounded-lg transition-all">
    <span class="material-symbols-outlined">search</span>
    ค้นหาอัจฉริยะ
  </button>
  <div class="w-[1px] h-6 bg-outline-variant/30 mx-2"></div>
  <button class="flex items-center gap-2 text-on-surface-variant font-bold px-4 py-2 hover:bg-white/5 rounded-lg transition-all">
    <span class="material-symbols-outlined">auto_fix_high</span>
    จัดระเบียบกล่องจดหมาย
  </button>
</div>
```

---

## Step 9: Email Card Component (Dashboard / Priority)

```html
<!-- Email Card with Priority Score -->
<div class="group flex items-center gap-6 p-6 rounded-lg bg-surface-container-high hover:bg-surface-bright transition-all cursor-pointer border-l-4 border-error">
  <!-- Priority Score -->
  <div class="flex flex-col items-center justify-center min-w-[60px]">
    <span class="text-2xl font-extrabold text-error">9.8</span>
    <span class="text-[10px] text-slate-500 uppercase font-bold">Score</span>
  </div>
  <!-- Avatar -->
  <div class="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden shrink-0">
    <img alt="ภาพโปรไฟล์ผู้ส่ง" class="w-full h-full object-cover" src="[avatar]"/>
  </div>
  <!-- Content -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-2 mb-1">
      <h4 class="font-bold text-white truncate">[ชื่อผู้ส่ง]</h4>
      <span class="text-[10px] bg-error-container/20 text-error px-2 py-0.5 rounded uppercase font-bold">ด่วนมาก</span>
    </div>
    <p class="text-on-surface-variant text-sm truncate">[Subject]</p>
  </div>
  <!-- Time + Actions -->
  <div class="flex items-center gap-6 shrink-0">
    <span class="text-xs text-slate-500 font-medium">14:02</span>
    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-primary/20 hover:text-primary transition-colors">
        <span class="material-symbols-outlined">archive</span>
      </button>
      <button class="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container hover:bg-error/20 hover:text-error transition-colors">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  </div>
</div>
```

---

## Step 10: AI Summary Panel (Inbox AI — Column 3)

```html
<section class="col-span-4 bg-surface-container-low p-8 border-l border-white/5 overflow-y-auto">
  <!-- AI Header -->
  <div class="flex items-center gap-3 mb-8">
    <div class="p-2 bg-primary/20 rounded-lg">
      <span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
    </div>
    <h3 class="font-headline font-bold text-xl tracking-tight">AI สรุปอัจฉริยะ</h3>
  </div>

  <!-- Summary Paragraph -->
  <div class="bg-surface-container p-6 rounded-lg border border-primary/10 mb-8">
    <p class="text-sm text-on-surface-variant leading-relaxed">[AI summary text]</p>
  </div>

  <!-- Key Points -->
  <h4 class="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">จุดสำคัญ</h4>
  <ul class="space-y-3 mb-8">
    <li class="flex items-start gap-3 text-sm text-on-surface">
      <span class="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></span>
      [Key point]
    </li>
  </ul>

  <!-- Action Required -->
  <h4 class="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">สิ่งที่ต้องทำ</h4>
  <div class="space-y-2 mb-8">
    <label class="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-lg border border-transparent hover:border-primary/20 cursor-pointer">
      <input class="w-4 h-4 rounded bg-surface-container-high border-none text-primary focus:ring-primary/50" type="checkbox"/>
      <span class="text-sm">[Action item]</span>
    </label>
  </div>

  <!-- Suggested Reply -->
  <h4 class="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">ตอบกลับที่แนะนำ</h4>
  <textarea class="w-full h-32 bg-surface-container-lowest border-none rounded-xl p-4 text-sm text-on-surface leading-relaxed focus:ring-1 focus:ring-primary/40 mb-4" placeholder="พิมพ์หรือแก้ไขการตอบกลับ..."></textarea>

  <!-- Send Button -->
  <button class="w-full py-4 premium-gradient text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
    <span class="material-symbols-outlined">send</span>
    ส่งการตอบกลับ
  </button>
</section>
```

---

## Step 11: Priority Score Badge Pattern

| Score   | Color Token | Label (ไทย)  | Border Color |
|---------|-------------|--------------|--------------|
| 90–100  | `error`     | ด่วนมาก      | `border-error` |
| 75–89   | `tertiary`  | สูง          | `border-tertiary` |
| 50–74   | `primary`   | ปานกลาง      | `border-primary` |
| 25–49   | `secondary` | ทั่วไป       | `border-secondary` |
| 0–24    | `outline`   | ต่ำ          | `border-outline` |

---

## Step 12: Dashboard Today Digest Card

```html
<section>
  <div class="glass-panel p-10 rounded-lg relative overflow-hidden group">
    <!-- Background Accent Glow -->
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700"></div>
    
    <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
      <!-- Left: AI Digest -->
      <div class="lg:col-span-2 space-y-6">
        <!-- AI Tag -->
        <div class="flex items-center gap-3">
          <span class="bg-tertiary-container/30 text-tertiary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">bolt</span>
            ข้อมูลจาก AI
          </span>
          <span class="text-slate-500 text-sm">สร้างเมื่อ 2 นาทีที่แล้ว</span>
        </div>
        <!-- Headline -->
        <h2 class="text-4xl font-headline font-extrabold text-white tracking-tight leading-tight">
          [AI digest headline with <span class="text-primary italic">'highlighted key'</span>]
        </h2>
        <!-- Bullet Points -->
        <ul class="space-y-4 pt-4">
          <li class="flex items-start gap-4">
            <div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
              <span class="material-symbols-outlined text-xs text-primary">check_circle</span>
            </div>
            <p class="text-on-surface-variant leading-relaxed">[Item]</p>
          </li>
        </ul>
        <!-- Actions -->
        <div class="flex items-center gap-4 pt-6">
          <button class="flex items-center gap-2 px-8 py-3 bg-surface-container-highest rounded-full font-bold hover:bg-white/10 transition-colors">
            <span class="material-symbols-outlined">play_circle</span>
            ฟังเสียงสรุป
          </button>
          <button class="flex items-center gap-2 px-8 py-3 border border-outline-variant/30 rounded-full font-bold hover:bg-white/5 transition-colors">
            ดูรายละเอียด
          </button>
        </div>
      </div>
      <!-- Right: Progress mini-card -->
      <div class="hidden lg:block">
        <div class="aspect-square bg-surface-container-low rounded-lg p-6 border border-outline-variant/20 flex flex-col justify-between">
          <!-- Progress content -->
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## กฎที่ต้องจำ (Quick Reference)

1. **สีพื้นหลัง**: `#0b1326` เสมอ — ห้ามใช้ `#000`
2. **Radius**: ต่ำสุด `1rem` (16px) — ห้ามใช้ 4px หรือ 8px
3. **Dividers**: ห้ามใช้ — ใช้ tonal shift หรือ spacing แทน
4. **Primary CTA**: ต้องเป็น gradient จาก `#d0bcff` → `#0566d9` เสมอ
5. **Active nav**: `text-violet-400 bg-violet-400/10 rounded-r-full`
6. **Glass**: `background: rgba(23,31,51,0.6); backdrop-filter: blur(20px);`
7. **Hover animation**: ทุก interactive element ต้องมี `transition-all duration-300`
8. **Thai font**: ต้องใส่ Noto Sans Thai ด้วยเสมอทุกครั้งที่มี Thai text
