<div align="center">

# ✦ VOID

### *Nothing important. Probably.*

A minimal, real-time messaging experience built for a custom client requirement.

<br/>

![React](https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<br/>

**[Live Demo](#) · [Features](#features) · [Architecture](#architecture)**

</div>

---

## ◈ The Idea

VOID started with a simple client requirement:

> *"I want something simple. I don't need another social network."*

The goal was to build a lightweight messaging platform with a focused experience — no feeds, no unnecessary features, no clutter.

Just authentication, a clean interface, and real-time communication.

The application was designed and implemented from the ground up around those requirements.

---

## ✦ What Was Built

<table>
<tr>
<td width="50%">

### 🔐 Authentication

Secure authentication powered by Supabase.

- Email & password login
- Protected routes
- Logout
- Failed-attempt handling
- Account email updates

</td>

<td width="50%">

### 💬 Real-Time Chat

A lightweight messaging experience.

- Instant message delivery
- Sender/receiver bubbles
- Message timestamps
- Automatic scrolling
- User display names

</td>
</tr>

<tr>
<td width="50%">

### 🎨 Custom UI

Designed instead of relying on a generic template.

- Dark aesthetic
- Glassmorphism
- Animated elements
- Responsive layouts
- Minimal interface

</td>

<td width="50%">

### ⚡ Supabase

Backend infrastructure without unnecessary complexity.

- Authentication
- PostgreSQL database
- Realtime subscriptions
- Profile management
- Row Level Security

</td>
</tr>
</table>

---

## ◇ Client → Solution

| Client Requirement | Implementation |
| --- | --- |
| Simple interface | Minimal React UI |
| Authentication | Supabase Auth |
| Real-time communication | Supabase Realtime |
| User identification | Profile system |
| Protected chat | React Protected Routes |
| Account management | Email update flow |
| Responsive experience | CSS responsive layouts |
| Easy maintenance | Modular service architecture |

---

## 🧠 Architecture

```text
                         ┌─────────────────┐
                         │   Landing Page  │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │      Login      │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  Supabase Auth  │
                         └────────┬────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │   Protected Chat    │
                       └──────────┬──────────┘
                                  │
                       ┌──────────┴──────────┐
                       ▼                     ▼
                ┌──────────────┐      ┌──────────────┐
                │  Messages   │      │   Profiles   │
                └──────┬───────┘      └──────┬───────┘
                       │                     │
                       └──────────┬──────────┘
                                  ▼
                         ┌─────────────────┐
                         │    Supabase     │
                         │   PostgreSQL    │
                         │    Realtime     │
                         └─────────────────┘
```

---

## ⚙️ Tech Stack

<div align="center">

| Layer | Technology |
| --- | --- |
| **Frontend** | React.js |
| **Build Tool** | Vite |
| **Routing** | React Router |
| **Backend** | Supabase |
| **Database** | PostgreSQL |
| **Authentication** | Supabase Auth |
| **Realtime** | Supabase Realtime |
| **Styling** | CSS3 |
| **Version Control** | Git + GitHub |

</div>

---

## 📁 Project Structure

```text
client/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   └── common/
│   │       └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── lib/
│   │   └── supabase.js
│   │
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Chat.jsx
│   │   └── UpdateEmail.jsx
│   │
│   ├── services/
│   │   ├── messageService.js
│   │   └── profileService.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 01 — Clone

```bash
git clone <YOUR_REPOSITORY_URL>
cd client
```

### 02 — Install

```bash
npm install
```

### 03 — Environment

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 04 — Run

```bash
npm run dev
```

Open the local Vite URL in your browser.

---

## 🔒 Security

Security was considered as part of the implementation rather than as an afterthought.

- Supabase handles authentication.
- Protected routes prevent unauthenticated access to chat.
- Database access can be controlled through Row Level Security.
- Service-role credentials are never exposed to the client.
- Authentication data and profile data remain separated.
- Environment variables are excluded from version control.

> **Never commit `.env` or Supabase service-role credentials to GitHub.**

---

## 🎨 Design Philosophy

VOID intentionally avoids looking like a conventional messaging application.

The landing experience was designed to feel like a completely independent, slightly mysterious website, while the actual application remains simple and functional.

The design language focuses on:

```text
Minimalism
    +
Dark UI
    +
Soft gradients
    +
Glass surfaces
    +
Subtle motion
    =
VOID
```

---

## 🔮 Future Scope

The initial version intentionally focuses on the core requirement.

Potential future iterations:

- 🎙️ Voice messages
- ✓ Read receipts
- ✍️ Typing indicators
- 🟢 Online presence
- ❤️ Message reactions
- 🗑️ Message deletion
- 🔔 Notifications
- 👤 Profile customization

These features can be introduced without changing the core architecture.

## 🧩 Development Journey

```text
Client Requirement
       ↓
Requirement Analysis
       ↓
UI / UX Design
       ↓
Supabase Setup
       ↓
Authentication
       ↓
Database & Profiles
       ↓
Realtime Messaging
       ↓
Protected Routes
       ↓
Account Management
       ↓
Responsive UI
       ↓
Testing & Refinement
```

The project was developed incrementally, validating each major feature before moving to the next stage.

---

<div align="center">

### Built with React + Supabase

**Designed for the requirement.  
Built from scratch.**

<br/>

`VOID © 2026`  

</div>
