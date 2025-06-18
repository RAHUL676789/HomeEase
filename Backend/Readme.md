# 🏡 EaseHome Backend

EaseHome is a service-based home solutions platform inspired by apps like UrbanClap. This backend handles authentication, service listings, user roles (provider/customer), and booking functionality.

---

## 🚀 Project Purpose

To build a real-world service booking system that enables:
- Service providers to list services (like plumbing, cleaning, electrical, etc.)
- Users to browse and book these services
- Admin-like control and authentication
- Scalable and secure backend APIs

---

## 🔧 Tech Stack

| Tech         | Description                            |
|--------------|----------------------------------------|
| Node.js      | JavaScript runtime for backend logic   |
| Express.js   | Web framework                          |
| MongoDB      | NoSQL database                         |
| Mongoose     | ODM for MongoDB                        |
| express-session | Session handling                    |
| bcrypt       | Password hashing                       |
| dotenv       | Environment variable management  
| jsonwebtoken | for token based authentication

---

## 📁 Project Structure

EaseHome-backend/
├── models/
│ └── 
│ └── serviceScema.js
│ └── 
├── routes/
│ └── 
│ └── serviceRoutes.js
│ └── 
├── controllers/
│ └── 
│ └── serviceController.js
│ └── 
├── middlewares/
│ └── 
│ └── isLoggedIn.js
│ └── 
├── utils/
│ └── ExpressError.js
│ └── asyncWrap.js
│ └── 
├── .env
├── index.js
|


