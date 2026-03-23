# ✨ Anti-Gravity — Thai AI Email Assistant

> **"ทำให้ผู้ใช้ไม่ต้องเปิดอีเมลอีกต่อไป"**

Anti-Gravity คือระบบผู้ช่วยอีเมลอัจฉริยะที่ใช้ AI เพื่อช่วยผู้ใช้ **อ่าน สรุป และจัดการอีเมล** โดยไม่จำเป็นต้องเปิดอ่านทีละฉบับ

---

## 🚀 ฟีเจอร์หลัก

| ฟีเจอร์ | รายละเอียด |
|---------|-----------|
| 📥 **Email Integration** | รองรับ Gmail / Outlook |
| ✨ **AI Summary (ไทย)** | TL;DR, Key Points, Action Required |
| 🧠 **Email Classification** | Important / Work / Finance / Promotion / Spam |
| ⭐ **Priority Scoring** | คะแนน 1–100 |
| 🔔 **Smart Notification** | แจ้งเฉพาะเมลสำคัญ |
| 🤖 **Suggested Reply** | ตอบภาษาไทยสุภาพ |

---

## 🎨 Design System — Zero-G Interface

UI ทั้งหมดออกแบบด้วย **Zero-G Interface Design System** ที่มีแนวคิด "Weightless Intelligence":

- **Palette**: Deep navy dark mode (`#0b1326`) + violet primary
- **Typography**: Manrope (Display) + Inter + Noto Sans Thai
- **Style**: Glassmorphism, gradient CTAs, ambient glow atmospheres
- **Philosophy**: No borders — ใช้ tonal shifts และ spacing แทน

### หน้าหลัก
1. **Dashboard** — Today AI Digest + Priority Emails
2. **Inbox AI** — 3-column: Categories | Email Feed | AI Summary Panel
3. **Priority Tasks** — AI-filtered tasks with scores
4. **Analytics** — Efficiency Pulse, time saved charts
5. **Settings**

---

## 🗂 โครงสร้างโปรเจค

```
EMAIL/
├── .agent/
│   └── skills/
│       └── zero_g_ui/
│           └── SKILL.md       # UI skill — Zero-G design system
├── stitch/                     # Stitch UI designs (source of truth)
│   ├── dashboard/
│   ├── inbox_ai/
│   ├── priority_tasks/
│   ├── analytics/
│   └── event_horizon/
│       └── DESIGN.md          # Design system documentation
├── .rules                     # Project rules & conventions
├── anti_gravity_prd.md        # Product Requirements Document
└── README.md
```

---

## 👤 User Personas

- **เจ้าของธุรกิจ** — ต้องตอบลูกค้าเร็ว, กลัวพลาดเมลสำคัญ
- **พนักงานออฟฟิศ** — รับเมลทั้งวัน, ต้องจัดลำดับงาน
- **ฟรีแลนซ์** — ติดต่อหลายลูกค้า, สับสนเมล

---

## 🛣 Roadmap

- **Phase 1 (MVP)**: อ่านเมล, สรุป, แยกประเภท
- **Phase 2**: Advanced AI — auto task creation, daily digest, learning behavior
- **Phase 3**: Full automation

---

## 💼 Monetization

- **Freemium** — ฟีเจอร์พื้นฐานฟรี
- **Subscription** — ฟีเจอร์ AI เต็มรูปแบบ

---

## 📋 KPIs

- Time saved per user
- Daily Active Users (DAU)
- Accuracy ของการจัดหมวด
- Conversion rate → paid user
