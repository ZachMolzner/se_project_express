## 🛠 Technologies & Techniques Used

**WTWR (What To Wear?) — Back-End API**

### Back-End Stack

- **Node.js** — server-side JavaScript runtime
- **Express.js** — framework for building RESTful APIs and handling routing
- **MongoDB** — NoSQL database for storing users and clothing items
- **Mongoose** — ODM for defining schemas, models, and validation logic

### Development Tools

- **Nodemon** — automatic server restart during development (`npm run dev`)
- **ESLint (Airbnb Style Guide)** — enforces clean and consistent code standards
- **Prettier** — automatic code formatting
- **Validator.js** — validates URL and email fields (avatars, item images, and user emails)
- **Git & GitHub** — version control and CI via GitHub Actions

### Application Architecture

- **Models** — MongoDB schemas for `User` and `ClothingItem`
- **Controllers** — business logic for authentication, CRUD operations, and ownership checks
- **Routes** — clean separation of `/signup`, `/signin`, `/users`, and `/items` endpoints
- **Utilities** — centralized constants such as HTTP error codes and JWT configuration

### Error Handling Strategy

- Centralized error handling using Express middleware
- Custom HTTP status code constants
- Handles:
  - Validation errors (**400**)
  - Authentication and authorization errors (**401 / 403**)
  - Not found errors (**404**)
  - Duplicate resource conflicts (**409**)
  - Server errors (**500**)
- All error responses return a consistent JSON format with a `message` field

### Security Foundations

- Password hashing using **bcryptjs**
- JWT-based authentication and protected routes
- Authorization middleware to secure user and item actions
- Ownership checks to prevent users from deleting items they do not own

---

## 🎥 Project Pitch Video

👉 **[Watch the Project Pitch Video](https://drive.google.com/file/d/1rVpPuUCEVEoG9jydfxAcBQr1TMXC9g_m/view)**

In this video, I explain the purpose of the WTWR back-end project, walk through my authentication and authorization implementation, discuss challenges encountered during development, and reflect on lessons learned and potential improvements.
