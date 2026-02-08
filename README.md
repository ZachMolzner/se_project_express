# 🛠 WTWR (What To Wear?) — Back-End API

This repository contains the back-end API for the **WTWR (What To Wear?)** full-stack application.  
The API handles authentication, user management, clothing item storage, and authorization logic.

---

## 🌐 Deployed Application

- **Back-End API Domain:**  
  👉 https://api.climatecloset.jumpingcrab.com

- **Front-End Repository:**  
  👉 https://github.com/zachmolzner/se_project_react

---

## ⚙️ Back-End Stack

- **Node.js** — server-side JavaScript runtime
- **Express.js** — framework for building RESTful APIs and handling routing
- **MongoDB** — NoSQL database for storing users and clothing items
- **Mongoose** — ODM for schema definitions, models, and data validation

---

## 🧰 Development Tools

- **Nodemon** — automatic server restarts during development (`npm run dev`)
- **ESLint (Airbnb Style Guide)** — enforces clean, consistent code standards
- **Prettier** — automatic code formatting
- **Validator.js** — validates URLs and email fields (avatars, item images, user emails)
- **Git & GitHub** — version control and CI via GitHub Actions

---

## 🏗 Application Architecture

- **Models** — MongoDB schemas for `User` and `ClothingItem`
- **Controllers** — business logic for authentication, CRUD operations, and ownership checks
- **Routes** — clear separation of `/signup`, `/signin`, `/users`, and `/items` endpoints
- **Utilities** — centralized constants for HTTP status codes and JWT configuration

---

## 🚨 Error Handling Strategy

- Centralized error handling using Express middleware
- Custom HTTP error classes and status code constants
- Handles:
  - Validation errors (**400**)
  - Authentication and authorization errors (**401 / 403**)
  - Not found errors (**404**)
  - Duplicate resource conflicts (**409**)
  - Server errors (**500**)
- All error responses return a consistent JSON structure with a `message` field

---

## 🔐 Security Foundations

- Password hashing using **bcryptjs**
- JWT-based authentication and protected routes
- Authorization middleware to secure user and item actions
- Ownership checks to prevent users from modifying or deleting items they do not own

---

## 🎥 Project Pitch Video

👉 **[Watch the Project Pitch Video](https://drive.google.com/file/d/1rVpPuUCEVEoG9jydfxAcBQr1TMXC9g_m/view)**

In this video, I explain the purpose of the WTWR full-stack project, walk through authentication and authorization logic, demonstrate deployment, discuss challenges encountered, and reflect on lessons learned and potential improvements.
