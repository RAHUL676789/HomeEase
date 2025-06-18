# 🏡 EaseHome — Home Service Booking Platform

EaseHome is a full-stack **home service booking platform** that allows users to browse, schedule, and manage various home services like plumbing, cleaning, electrical repairs, and more — all from one place.

---

## 🌐 Live Demo

🚀 [Live Website](https://your-deployment-url.com)  
🛠️ Backend API: `https://your-api-url.com/api`

---

## 📸 Screenshots

| Home Page | Service Details | Booking Flow |
|-----------|------------------|---------------|
| ![](./screenshots/home.png) | ![](./screenshots/service.png) | ![](./screenshots/booking.png) |

---

## 🧠 Features

- 🏠 Browse and explore local home services
- 📅 Book and schedule services with ease
- 🔐 User authentication (Signup / Login)
- 📋 Booking dashboard (Upcoming & past bookings)
- 📱 Fully responsive design
- ⚡ Smooth UX with loading states and transitions
- 🎨 Clean and modern UI with Tailwind CSS

---

## 🛠️ Tech Stack

### 💻 Frontend (Client)
- React.js
- React Router DOM
- Tailwind CSS
- React Hook Form + Yup (Validation)
- Framer Motion / GSAP (Animations)

### 🔧 Backend (Server)
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt.js (Password hashing)
- dotenv, cors, express-session, connect-mongo

---

## 📁 Project Structure

EaseHome/
│
├── client/ # Frontend (React)
│ ├── src/
│ ├── public/
│ └── ... (package.json, tailwind.config.js)
│
├── backend/ # Backend (Node.js + Express)
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middlewares/
│ └── ... (server.js, .env)
│
├── .gitignore
├── README.md
└── package.json