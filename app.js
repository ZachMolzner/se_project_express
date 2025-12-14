const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Temporary authorization middleware
app.use((req, res, next) => {
  req.user = {
    _id: "693cc4b7f5604a327f9ea85f",
  };
  next();
});

// Test route (optional)
app.get("/", (req, res) => {
  res.send({ message: "Server is working 🎉" });
});

// Main routes
app.use("/", routes);

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
