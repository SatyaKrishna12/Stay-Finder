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
StayFinder/<br>
├── backend/<br>
│ ├── models/<br>
│ ├── routes/<br>
│ ├── middleware/<br>
│ ├── utils/<br>
│ ├── cloudConfig.js<br>
│ ├── server.js<br>
│ └── .env<br>


### Frontend

StayFinder/<br>
├── frontend/<br>
│ ├── components/<br>
│ ├── pages/<br>
│ ├── hooks/<br>
│ ├── App.jsx<br>
│ └── main.jsx<br>

---

### Setup Backend
```bash
cd backend
npm install
```

### Create a .env file in the backend/ directory with:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
<br>
# Start the backend server:
``` bash
npm run dev
```
---

### 📦 Image Upload (Cloudinary)
-Uses multer-storage-cloudinary for handling uploads from forms
-Listings are created with req.file for the image
-Images are stored on Cloudinary and URLs are saved in MongoDB

### 🧑‍💻 Author
Made with ❤️ by Satya Krishna


