require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001, MONGO_URL = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://climatecloset.jumpingcrab.com",
  "https://www.climatecloset.jumpingcrab.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman/curl (no origin) and allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// request logger — BEFORE routes
app.use(requestLogger);

//  CRASH TEST ROUTE (required for review)
// Must be BEFORE /signin and /signup
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// routes
app.use("/", routes);

// error logger — AFTER routes
app.use(errorLogger);

// celebrate validation errors
app.use(errors());

// centralized error handler (LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
