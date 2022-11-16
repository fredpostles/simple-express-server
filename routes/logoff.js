const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  delete req.currentUser.currentToken;
  res.send({ status: 1 });
});

module.exports = router;
