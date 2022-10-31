const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  console.log("Delete ran!");

  delete req.currentUser.token;

  res.send({ status: 1 });
});

module.exports = router;
