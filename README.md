🛠 Technologies & Techniques Used

Back-End Stack

Node.js — server-side JavaScript runtime

Express.js — framework for building the API and route handling

MongoDB — NoSQL database storing users and clothing items

Mongoose — ODM used to define schemas, models, and validation

Development Tools

Nodemon — auto-restart server on file changes (npm run dev)

ESLint (Airbnb Style Guide) — enforces clean, consistent code

Prettier — automatic code formatting

Validator.js — validates URLs for avatar and image fields

Git & GitHub — version control and continuous integration (GitHub Actions)

Architecture

Models — MongoDB schemas for User and ClothingItem

Controllers — logic for CRUD operations and error handling

Routes — clean separation for /users and /items endpoints

Utilities — central storage of reusable constants (e.g., error codes)

Error Handling

Centralized error handler using Express middleware

Custom status code constants

Validation (400), Not Found (404), CastError handling, and protected 500 errors

Consistent JSON responses with a message field only

Security Foundations (Early Stages of WTWR Project)

Temporary user authorization placeholder (req.user)

Structured to support JWT-based authentication in later sprints
