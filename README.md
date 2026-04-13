# 🚰 Smart Dispenser App

A modern web-based dashboard for monitoring and controlling a **Smart Water Dispenser** in real-time.
Built with **Next.js**, this system provides live device status, water quality monitoring, usage analytics, and remote control features.

---

## ✨ Features

- 📡 **Real-time Device Monitoring**
  - Online/offline status
  - Last update timestamp
  - Live sensor data (TDS, water level)

- 💧 **Water Quality Tracking**
  - TDS (Total Dissolved Solids) monitoring
  - Visual water level indicator

- 📊 **Usage Analytics**
  - Daily water usage
  - Consumption trends chart
  - Transaction history

- ⚙️ **Device Control**
  - Manual valve control
  - Auto dispense with selected volume
  - Continuous dispensing mode

- 📱 **Responsive Dashboard**
  - Optimized for mobile & desktop
  - Adaptive sidebar & navbar behavior

- 🔐 **Authentication**
  - Admin login system (NextAuth)

---

## 🧱 Tech Stack

- ⚡ Next.js
- ⚛️ React (App Router / Client Components)
- 🎨 Tailwind CSS
- 🔥 Firebase (Realtime Database / Firestore)
- 🔐 NextAuth.js
- 📊 Chart utilities (custom + chart libs)

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/nurwahibzy/Smart-Dispenser-App.git
cd Smart-Dispenser-App
```

---

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

### 3. Setup Environment Variables

Create `.env.local` file:

```env
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain
FIREBASE_PROJECT_ID=your_project_id
```

---

### 4. Run Development Server

```bash
npm run dev
```

Open 👉 [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```bash
src/
│
├── components/        # Reusable UI components
├── features/          # Feature-based modules (device, transaction, water)
├── lib/               # Hooks & utilities
├── types/             # TypeScript types
├── app/ or pages/     # Routing
```

---

## 📊 Key Modules

- **Device Module**
  - Realtime status (online/offline)
  - Valve control & simulation

- **Transaction Module**
  - Water usage tracking
  - History table & charts

- **Water Module**
  - Water level visualization
  - Sensor integration

---

## 🎯 UI Highlights

- Responsive sidebar (accordion mobile + collapse desktop)
- Adaptive navbar layout
- Optimized spacing for mobile
- Smooth UI interactions (performance optimized)

---

## 🚀 Deployment

Recommended:
👉 Deploy using Vercel

```bash
npm run build
npm start
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📌 Notes

- This project is designed for **IoT-based water dispenser systems**
- Requires backend/device integration for full functionality
- Firebase is used for real-time communication

---

## 👨‍💻 Author

Developed by 🚀

- Ananda Rahmawati — 2341720048
- Nurwahib Zakki Yahya — 2341720154
- Reika Amalia Syahputri — 2341720173
- Satrio Wisnu Adi Pratama — 2341720219

Smart Dispenser Project
