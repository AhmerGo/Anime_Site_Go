const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const axios = require("axios");

// Always require and configure near the top
require("dotenv").config();

// Connect to the database
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.get("/api/anilist/popular", async (req, res) => {
  try {
    // Forward the request to the external API
    const apiResponse = await axios.get(
      "https://anidote-api.vercel.app//meta/anilist/popular"
    );
    // Send the response of the external API back to your frontend
    res.json(apiResponse.data);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
});

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// CORS middleware: this will apply to all responses
app.use((req, res, next) => {
  // Set the allowed origin to your specific IP address
  res.header("Access-Control-Allow-Origin", "http://192.168.4.21:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // If you're using other HTTP methods, include them in the list
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
// to return the index.html on all non-AJAX/API requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
