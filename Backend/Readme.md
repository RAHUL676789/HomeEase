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
| dotenv       | Environment variable management        |
| jsonwebtoken | for token based authentication         |
| node-cron    | for automation scheduling task         |
---

## 📁 Project Structure

EaseHome-backend/
|---index.js
|---server.js
├── models/
│ └── 
│ └── serviceScema.js
│ └── bookingSchema.js
│ └── partnerSchema.js
│ └── userSchema.js

├── routes/
│ └── 
│ └── serviceRouter.js
│ └── BookingRouter.js
| └── UserRouter.js
| └── PartnerRouter.js
| └── HomeDashRouter.js
| └── node-cron
  
  
├── controllers/
│ └── partnercontroller.js
│ └── serviceController.js
│ └── userController
│ └── BookingController.js
│ └── auth
│ 

├── middlewares/
│ └── isValidSessionUser
│ └── isLoggedIn
│ └── verifyUser
│ └── verifyPartner
│ └── validateBookingBody
│ └── validateServiceBody
│ └── validateUSerBody
│ └── validatePartnerBody
 

│ └── 
├── utils/
│ └── ExpressError.js
│ └── asyncWrap.js
│ └── 
├── .env
├── index.js
├── helper
│ └── cloudinary.js
│ └── otpservice.js
│ └── sendotp.js




