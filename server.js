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
  res.header(
    "Access-Control-Allow-Origin",
    "http://ec2-18-216-226-12.us-east-2.compute.amazonaws.com:3001"
  ); // Update with the domain you want to allow
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
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
