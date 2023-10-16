const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

// Always require and configure near the top
require("dotenv").config();

// Connect to the database
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// CORS middleware: this will apply to all responses
app.use((req, res, next) => {
  // Define the origin(s) you want to allow
  const allowedOrigins = [
    "http://ec2-18-216-226-12.us-east-2.compute.amazonaws.com:3001",
    "http://192.168.4.21:3001", // add any other origins you want to allow
    // "http://localhost:3000", // For local development, if necessary
  ];

  // Check if the request's origin is in the allowed list
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Optionally allow credentials (cookies, authentication)
  res.header("Access-Control-Allow-Credentials", "true");

  // Allowed methods for CORS requests
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );

  // Allowed headers for CORS requests
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Call the next middleware function
  next();
});

// Middleware to check and verify a JWT and
// assign the user object from the JWT to req.user
app.use(require("./config/checkToken"));

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
// app.use('/api/discussions', require('./routes/api/discussions'))

// The following "catch all" route (note the *) is necessary
// for returning the index.html on all non-AJAX/API requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
