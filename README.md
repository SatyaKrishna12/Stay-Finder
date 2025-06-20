# 🏡 StayFinder

**StayFinder** is a full-stack web application for discovering and listing vacation stays. It allows users to explore available stays, search listings, make bookings, and add their own listings. Admins can moderate and manage listings. This app mimics functionality similar to Airbnb with a custom design and user roles.

## 🌐 Live Demo

> 🔗 https://stay-finder-1-c24n.onrender.com/


## 🔧 Features

### ✅ General Users
- Browse all available listings
- Search and filter listings by title and location
- View listing details
- Create an account and log in
- Add a new stay listing with image upload
- Book listings (conditional on login)
- View all your bookings

### ✅ Admin
- Special role-based login (JWT + cookies)
- View all listings
- Delete or moderate listings

---

## 🏗️ Tech Stack

### Frontend:
- **React.js** (with React Router)
- **Tailwind CSS** (UI styling)
- **Axios** (for API requests)

### Backend:
- **Express.js** (Node.js framework)
- **MongoDB** with **Mongoose** (database)
- **JWT** with **httpOnly Cookies** (authentication)
- **Multer + Cloudinary** (for image upload)
- **Bcrypt** (password hashing)
- **dotenv** (for environment variables)

---

## 📁 Project Structure

### Backend
StayFinder/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ ├── cloudConfig.js
│ ├── server.js
│ └── .env


### Frontend

StayFinder/
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ ├── App.jsx
│ └── main.jsx



