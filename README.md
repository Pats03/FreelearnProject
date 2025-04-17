# 📚 FreeLearn - Education Platform

**Enhancing Literacy in Rural India Through Smartphone-Based Learning**

---

## 🚀 Project Overview

**FreeLearn** is an education platform built to boost literacy in rural India by leveraging the accessibility of smartphones. It enables students, especially rural youth, to learn at their convenience through curated educational content.

The platform delivers accessible, relevant, and easy-to-use educational content, thus bridging the digital and knowledge divide.

---

## 🎯 Key Features

- 📱 **Mobile-Optimized Learning:** Designed to work efficiently on smartphones.
- 🧠 **Self-Paced Education:** Students can access and learn anytime, anywhere.
- 🎥 **Multimedia Content Delivery:** Supports text, video, and visual content.
- 🔐 **Role-Based Access:** Admins, teachers, and students have tailored experiences.
- 🌐 **Interactive Frontend + Scalable Backend**

---

## 🛠️ Tech Stack (MERN)

| Layer         | Technology        |
|---------------|-------------------|
| Frontend      | React.js, Tailwind CSS |
| Backend       | Node.js, Express.js |
| Database      | MongoDB            |
| Authentication| JWT, Bcrypt        |
| Other Tools   | Multer (file uploads), Mongoose (ORM), React Router |

---

## 📂 Folder Structure
FreelearnProject/ ├── client/ # React frontend │ ├── public/ │ └── src/ │ ├── components/ │ ├── pages/ │ ├── App.jsx │ └── index.js ├── server/ # Node.js backend │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── middleware/ │ ├── server.js │ └── config/ └── README.md

---

## 🧑‍💻 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Pats03/FreelearnProject.git
cd FreelearnProject
cd server
npm install
npm start
🔑 Environment Variables
Create a .env file inside server/ with the following:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

👤 Roles and Access
Admin – Verifies content and manages user access.

Teacher – Uploads content for students.

Student – Learns from available content.
📈 Future Improvements
Add language translation/localization.

Real-time chat or discussion forum.

Push notifications for lessons or tests.

🤝 Contributing
Pull requests are welcome! Feel free to open issues or suggest features.

📜 License
This project is licensed under the MIT License.

🙌 Acknowledgements
Built with ❤️ to empower rural education in India.
