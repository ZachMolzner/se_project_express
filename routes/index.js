const router = require("express").Router();

const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");

const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("../utils/errors");

// Public auth routes
router.post("/signup", createUser);
router.post("/signin", login);

// Public items (GET only stays public; rest protected inside routes/clothingItems.js)
router.use("/items", itemRoutes);

// Protect everything after this line
router.use(auth);

// Protected routes
router.use("/users", userRoutes);

// Unknown routes (404)
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// ✅ Centralized error handler (MUST have 4 params)
router.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message =
    statusCode === INTERNAL_SERVER_ERROR
      ? "An error has occurred on the server"
      : err.message;

  res.status(statusCode).send({ message });
});

module.exports = router;
