const express = require("express");
const { checkCreds, addToken } = require("../mysql/queries");
const { getUniqueId } = require("../utils");
const router = express.Router();
const sha256 = require("sha256");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  // check that username and password match details on system
  if (!email || !password) {
    res.send({ status: 0, error: "Invalid input data" });
    return;
  }

  password = sha256(process.env.SALT + password);

  const results = await req.asyncMySQL(checkCreds(email, password));

  // if credentials don't match, return
  if (results.length === 0) {
    res.send({ status: 0, error: "Incorrect email and/or password" });
    return;
  }

  const token = getUniqueId(64);

  await req.asyncMySQL(addToken(results[0].id, token));

  res.send({
    status: 1,
    message: "User successfully logged in",
    token: token,
  });
});

module.exports = router;
