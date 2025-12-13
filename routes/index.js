const router = require("express").Router();

const userRoutes = require("./users");
const itemRoutes = require("./clothingItems");
const { createUser } = require("../controllers/users");

// POST /signup — required for Postman test suite
router.post("/signup", createUser);

// all /users requests go to routes/users.js
router.use("/users", userRoutes);

// all /items requests go to routes/clothingItems.js
router.use("/items", itemRoutes);

module.exports = router;
