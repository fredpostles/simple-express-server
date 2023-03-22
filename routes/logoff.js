const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  const { simpsons, currentUser, headers } = req;
  const currentToken = headers.currenttoken;

  console.log("headers:", headers);
  console.log("currentUser:", currentUser);

  let tokenFound = false;

  for (let i = 0; i < currentUser.userTokens.length; i++) {
    if (currentUser.userTokens[i] === currentToken) {
      currentUser.userTokens.splice(i, 1);
      tokenFound = true;
      break;
    }
  }

  if (!tokenFound) {
    res.send({
      status: 0,
      error: "Token not found",
    });
    return;
  }

  console.log("currentUser after logoff:", currentUser);

  res.send({
    status: 1,
    message: "User successfully logged off (current token deleted)",
  });
});

module.exports = router;
