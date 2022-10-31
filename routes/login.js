const express = require("express");
const { getUniqueId } = require("../utils");
const router = express.Router();

router.post("/", (req, res) => {
  const { body, simpsons } = req;
  // check that username and password match details on system
  //   console.log(req.body);

  if (!body.userName || !body.password) {
    res.send({ status: 0, error: "Wrong credentials" });
  }

  const indexOfUser = simpsons.findIndex((user) => {
    return user.userName === body.userName && user.password === body.password;
  });

  // if user & password match, generate a token and send to user
  if (indexOfUser > -1) {
    const currentToken = getUniqueId(64);
    let userTokens = [];

    userTokens.push(currentToken);

    simpsons[indexOfUser].userTokens = [...userTokens];

    res.send({ status: 1, currentToken });
    return;
  }

  res.send({ status: 0, error: "Wrong credentials" });
});

module.exports = router;
