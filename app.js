const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { INTERNAL_SERVER_ERROR } = require("./utils/errors");

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());

// 1. Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// 2. Temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "693cc4b7f5604a327f9ea85f", // replace later with real test user id
  };
  next();
});

// 3. Test route (optional)
app.get("/", (req, res) => {
  res.send({ message: "Server is working 🎉" });
});

// 4. Main routes (/users, /items)
app.use("/", routes);

// 5. 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// 6. Centralized error handler
app.use((err, req, res, _next) => {
  console.error(err);

  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message =
    statusCode === INTERNAL_SERVER_ERROR
      ? "An error has occurred on the server"
      : err.message;

  res.status(statusCode).send({ message });
});

// 7. Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
