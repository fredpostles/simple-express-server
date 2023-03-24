const express = require("express");
const { updateUser } = require("../mysql/queries");
const router = express.Router();
const sha256 = require("sha256");

router.put("/", async (req, res) => {
  let { email, name, password } = req.body;
  const { token } = req.headers;

  if (email && typeof email === "string") {
    await req.asyncMySQL(updateUser("email", email, token));
  }
  if (name && typeof name === "string") {
    await req.asyncMySQL(updateUser("name", name, token));
  }
  if (password && typeof password === "string") {
    password = sha256(process.env.SALT + password);
    await req.asyncMySQL(updateUser("password", password, token));
  }

  res.send({ status: 1, message: "Success!" });
});

module.exports = router;
