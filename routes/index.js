const router = require("express").Router();

const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../errors/not-found-error");

const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

// Public auth routes (VALIDATED)
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

// Public items router (GET is public; rest protected inside clothingItems.js)
router.use("/items", itemRoutes);

// Protect everything after this line
router.use(auth);

// Protected routes
router.use("/users", userRoutes);

// 404 handler → centralized error handler
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
