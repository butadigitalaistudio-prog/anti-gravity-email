# Anti-Gravity (Thai Version) – Product Requirements Document (PRD)

## 1. ภาพรวมของโปรดักต์ (Product Overview)

**ชื่อโปรดักต์:** Anti-Gravity (Thai AI Email Assistant)

**คำอธิบาย:**
Anti-Gravity คือระบบผู้ช่วยอีเมลอัจฉริยะที่ใช้ AI เพื่อช่วยผู้ใช้ “อ่าน สรุป และจัดการอีเมล” โดยไม่จำเป็นต้องเปิดอ่านทีละฉบับ

**ปัญหาที่แก้:**
- ผู้ใช้เสียเวลาอ่านอีเมลจำนวนมาก
- แยกเมลสำคัญกับไม่สำคัญยาก
- พลาดอีเมลสำคัญ
- ต้องเสียเวลาคิดตอบอีเมล

**Solution:**
AI จะ:
- อ่านอีเมลแทน
- สรุปเป็นภาษาไทย
- แยกประเภท
- แนะนำสิ่งที่ต้องทำ

## 2. เป้าหมาย (Objectives & Goals)

### 🎯 เป้าหมายทางธุรกิจ
- สร้าง SaaS สำหรับตลาดไทย
- เพิ่ม retention ของผู้ใช้
- สร้างรายได้จาก subscription

### 👤 เป้าหมายผู้ใช้
- ลดเวลาอ่านอีเมล ≥ 70%
- เข้าใจ inbox ภายใน 10 วินาที
- ลดความเครียดจากอีเมล

### 📊 KPI
- Time saved per user
- Daily active users (DAU)
- Accuracy ของการจัดหมวด
- Conversion rate เป็น paid user

## 3. User Personas

### Persona 1: เจ้าของธุรกิจ
- ใช้อีเมลเยอะ
- ต้องตอบลูกค้าเร็ว
- Pain point: พลาดเมลสำคัญ

### Persona 2: พนักงานออฟฟิศ
- รับเมลทั้งวัน
- ต้องจัดลำดับงาน
- Pain point: เมลเยอะเกินไป

### Persona 3: ฟรีแลนซ์
- ติดต่อหลายลูกค้า
- งานหลากหลาย
- Pain point: สับสนเมล

## 4. User Journey

1. ผู้ใช้เชื่อมต่อ Gmail / Outlook
2. ระบบดึงอีเมลเข้ามา
3. AI วิเคราะห์:
   - สรุป
   - แยกประเภท
   - ให้คะแนนความสำคัญ
4. ผู้ใช้เปิด Dashboard
5. เห็น “Today Digest”
6. เข้า Priority View → ลงมือทำงาน

## 5. ฟีเจอร์หลัก (Core Features)

### 📥 Email Integration
- รองรับ Gmail / Outlook
- ดึงข้อมูล subject / body / attachment

### ✨ AI Summary (ภาษาไทย)
- TL;DR (สั้น)
- Key Points
- Action Required

### 🧠 Email Classification
- Important / Work / Finance / Promotion / Spam

### ⭐ Priority Scoring
- คะแนน 1–10

### 🔔 Smart Notification
- แจ้งเฉพาะเมลสำคัญ

### 🤖 Suggested Reply
- ตอบภาษาไทยสุภาพ

## 6. ฟีเจอร์ขั้นสูง (Advanced Features)

- Auto Task Creation
- Daily Digest
- Learning Behavior
- Semantic Search

## 7. UX/UI Requirements

- Dashboard
- Inbox AI (3 คอลัมน์)
- Priority View

## 8. Technical Requirements

- Frontend: React
- Backend: Node.js / Python
- AI: LLM

## 9. MVP Scope

### Include
- อ่านเมล
- สรุป
- แยกประเภท

### Exclude
- Automation เต็มระบบ

## 10. Risks

- AI ผิดพลาด
- Privacy

## 11. Roadmap

- Phase 1: MVP
- Phase 2: Advanced AI
- Phase 3: Automation

## 12. Monetization

- Freemium
- Subscription

## 13. Vision

“ทำให้ผู้ใช้ไม่ต้องเปิดอีเมลอีกต่อไป”
