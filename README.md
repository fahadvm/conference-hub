# 🌐 Conference-Hub

**Conference-Hub** is a state-of-the-art, professional video conferencing platform designed for seamless collaboration. 
Built with a modern tech stack incorporating React, Supabase, and LiveKit,
it provides a robust environment for virtual meetings with low-latency video, secure authentication, and a high-fidelity user interface.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth/DB-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![LiveKit](https://img.shields.io/badge/LiveKit-Streaming-646CFF?logo=livekit&logoColor=white)](https://livekit.io/)

---

## ✨ Key Features

- **🚀 Real-time Video Conferencing**: High-quality, low-latency video and audio calls powered by LiveKit Cloud.
- **🔒 Secure Authentication**: Robust user registration and login system managed through Supabase Auth.
- **📅 Meeting Scheduling**: Create and manage upcoming meetings with ease.
- **🔗 Shareable Quick-Links**: Generate unique meeting codes and shareable URLs for instant access.
- **👤 User Profiles**: Personalized user dashboards to manage meetings and account settings.
- **🎨 Modern Professional UI**: A sleek, dark-themed interface built with Shadcn UI and Framer Motion animations.
- **📱 Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.

---

## 🛠️ Technologies Used

### Frontend
- **Framework**: [React 19](https://react.dev/) (Vite)
- **State Management**: React Context API
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Video Infrastructure**: [LiveKit React Components](https://docs.livekit.io/realtime/components/react/)

### Backend & Infrastructure
- **BaaS**: [Supabase](https://supabase.com/) (Authentication, Database, Edge Functions)
- **Real-time Server**: [LiveKit Cloud](https://livekit.io/cloud)
- **Edge Functions**: Supabase Edge Functions for secure token generation
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📸 Screenshots

<img width="1878" height="891" alt="image" src="https://github.com/user-attachments/assets/22d8e28c-65c3-4883-a3f7-04260ecd2055" />


---

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A Supabase account
- A LiveKit Cloud account

### 1. Clone the Repository
```bash
git clone https://github.com/fahadvm/conference-hub.git
cd conference-hub
```

### 2. Frontend Configuration
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory and add your credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_LIVEKIT_URL=your_livekit_url
```

### 3. Supabase Edge Functions
To handle LiveKit token generation, deploy the edge function:
```bash
cd ..
supabase functions deploy get-livekit-token
```
Ensure your Supabase project has `LIVEKIT_API_KEY` and `LIVEKIT_API_SECRET` configured in the secrets.

### 4. Running Locally
```bash
# In the frontend directory
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 📁 Folder Structure

```text
conference-hub/
├── frontend/                # React Vite Application
│   ├── src/
│   │   ├── components/      # UI & Layout components
│   │   ├── contexts/        # Auth & App state contexts
│   │   ├── lib/             # Supabase & utility clients
│   │   └── pages/           # Main route components
│   ├── tailwind.config.js   # Style configuration
│   └── vite.config.ts       # Build configuration
├── backend/                 # Node.js/Express (Skeleton)
├── supabase/                # Supabase configuration
│   └── functions/           # Edge Functions (Token generation)
└── README.md                # Documentation
```

---

## 📡 API Endpoints (Edge Functions)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/functions/v1/get-livekit-token` | Generates a JWT for LiveKit room participants |

---

## 💡 Key Learnings & Highlights

- **Edge Function Integration**: Implementing secure server-side logic using Supabase Edge Functions to manage RTC tokens without a dedicated persistent backend.
- **Real-time WebRTC**: Leveraging LiveKit's high-level components to build complex video conferencing features rapidly.
- **Modern UI Patterns**: Utilizing GSAP and Framer Motion for micro-interactions that enhance the "premium" feel of the application.
- **Scalable Architecture**: Following a clean component-based structure that separates business logic (contexts) from presentation (pages).

---


## 🔗 Live Demo
[View Live Site](https://meets.fahadvm.xyz/)

---



Developed by Fahad VM
