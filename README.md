## 🛠 Technologies & Techniques Used

### Back-End Stack

- **Node.js** — server-side JavaScript runtime
- **Express.js** — framework for building RESTful APIs and handling routing
- **MongoDB** — NoSQL database for storing users and clothing items
- **Mongoose** — ODM for defining schemas, models, and validation logic

### Development Tools

- **Nodemon** — automatic server restart during development (`npm run dev`)
- **ESLint (Airbnb Style Guide)** — enforces clean and consistent code standards
- **Prettier** — automatic code formatting
- **Validator.js** — validates URL fields (avatars and item images)
- **Git & GitHub** — version control and continuous integration via GitHub Actions

### Application Architecture

- **Models** — MongoDB schemas for `User` and `ClothingItem`
- **Controllers** — business logic for CRUD operations and error handling
- **Routes** — clean separation of `/users` and `/items` endpoints
- **Utilities** — centralized constants such as HTTP error codes

### Error Handling Strategy

- Centralized error handling using Express middleware
- Custom HTTP status code constants
- Handles validation errors (400), invalid IDs (CastError), not found (404), and server errors (500)
- All error responses return a consistent JSON format with a `message` field

### Security Foundations (Early WTWR Stages)

- Temporary authorization middleware (`req.user`) for development
- Structured to support JWT-based authentication in later sprints
