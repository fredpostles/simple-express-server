const express = require("express");
const { deleteToken } = require("../mysql/queries");
const router = express.Router();

router.delete("/", async (req, res) => {
  await req.asyncMySQL(deleteToken(req.headers.token));

  res.send({
    status: 1,
    message: "User successfully logged off (current token deleted)",
  });
});

module.exports = router;
