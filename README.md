
# 📰 Bloggs — MERN Stack Blog Application

A modern full-stack blog platform built using **React**, **Node.js**, **Express**, and **MongoDB**, with **Firebase Authentication** for secure user login and Tailwind CSS for an elegant UI.  

This project demonstrates a full-featured blog system where users can:
- ✍️ Create, edit, and delete their own blogs  
- 👀 View all public blogs  
- 🔐 Authenticate via Google (Firebase)  
- 🌙 Enjoy a clean, modern, fully responsive UI  

---

## 🧰 **Tech Stack**

### 🖥️ Frontend
- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Axios** (for API communication)
- **React Router DOM**
- **Firebase Auth (Client SDK)**

### ⚙️ Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Firebase Admin SDK**
- **dotenv** (for environment management)
- **CORS + Helmet**
- **TypeScript**

---

## 📁 **Project Structure**

```

bloggs-react-project/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── firebaseAdmin.ts
│   │   │   └── mongo.ts
│   │   ├── routes/
│   │   │   └── blogs.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md

````

---

## ⚙️ **Installation and Setup**

### 🧩 Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Firebase Project](https://console.firebase.google.com/)
- [Git](https://git-scm.com/)

---

## 🚀 **Clone the Repository**

```bash
git clone https://github.com/FarisShamsudeen/bloggs-react-project.git
cd bloggs-react-project
````

---

## 🔧 **Backend Setup**

```bash
cd backend
npm install
```

### ⚙️ Create `.env` file inside `backend/`

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/blogapp
FIREBASE_SERVICE_ACCOUNT_KEY=/absolute/path/to/your/firebase-admin-key.json
```

> 🛑 **Note:**
> Do **not** include your Firebase Admin JSON file in the repo.
> Store it securely on your local system and reference it via `.env`.

### ▶️ Run Backend Server

```bash
npm run dev
```

If successful, you’ll see:

```
✅ Firebase Admin initialized securely
MongoDB connected
✅ Server listening on 4000
```

---

## 💻 **Frontend Setup**

```bash
cd ../frontend
npm install
```

### ⚙️ Create `.env` file inside `frontend/`

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_URL=http://localhost:4000/api
```

### ▶️ Run Frontend

```bash
npm run dev
```

Your frontend will run at:
👉 `http://localhost:5173/`

---

## 🧠 **How It Works**

| Component          | Description                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| **Frontend**       | Built using React (Vite). Handles user UI, authentication, and calls backend via Axios.                  |
| **Backend**        | Node.js + Express handles all API requests (CRUD for blogs).                                             |
| **Authentication** | Firebase Auth verifies users on frontend, and the backend uses Firebase Admin SDK to validate ID tokens. |
| **Database**       | MongoDB stores blogs linked to each Firebase user.                                                       |

---

## 🪄 **Running Both Servers Together**

You’ll need **two terminals** open:

### 🖥️ Terminal 1 — Run Backend

```bash
cd backend
npm run dev
```

### 🌐 Terminal 2 — Run Frontend

```bash
cd frontend
npm run dev
```

Now visit your app at:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## ✅ **Features Implemented**

* 🔐 Firebase Authentication (Google Sign-in)
* 🗃️ MongoDB Blog Storage
* ✍️ Blog CRUD (Create, Read, Update, Delete)
* 💬 Markdown Support with Preview
* 💅 Fully Responsive Tailwind UI
* 🧠 Protected Routes
* ⚠️ Toast Alerts (Success, Error, Warning)
* 🪟 Custom Modals for Edit, Delete, Logout Confirmations

---

## 🧑‍💻 **Developer Notes**

* Keep your `.env` and Firebase key file **private**.
* Don’t commit secrets to GitHub — they’ll be blocked.
* If you clone this project:

  * Create your own Firebase project.
  * Replace the `.env` values with your own credentials.

---

## 🤝 **Contributing**

Pull requests are welcome!
If you’d like to improve UI, add new features, or refactor backend routes, please fork the repo and submit a PR.

---

## ⚖️ **License**

This project is licensed under the **MIT License** — free to use and modify.

---

## 🌟 **Author**

**👨‍💻 Faris Shamsudeen**
*MERN Stack Developer*
📫 [GitHub Profile](https://github.com/FarisShamsudeen)

```
