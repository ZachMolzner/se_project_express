const router = require("express").Router();

const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { createUser } = require("../controllers/users");
const { INTERNAL_SERVER_ERROR } = require("../utils/errors");

// Required for Postman tests
router.post("/signup", createUser);

router.use("/users", userRoutes);
router.use("/items", itemRoutes);

// Unknown routes (404)
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Centralized error handler
router.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message =
    statusCode === INTERNAL_SERVER_ERROR
      ? "An error has occurred on the server"
      : err.message;

  res.status(statusCode).send({ message });

  // optional, keeps signature correct for Express middleware chain
  next();
});

module.exports = router;
