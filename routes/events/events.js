const express = require("express");
const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
  res.send("events homepage");
});

// About page route.
router.get("/about", function (req, res) {
  res.send("about events");
});

module.exports = router;