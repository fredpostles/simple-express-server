const express = require("express");
const router = express.Router();

router.put("/", (req, res) => {
  const { body, currentUser } = req;

  if (body.quote && typeof body.quote === "string") {
    currentUser.quote = body.quote;
  }
  if (body.character && typeof body.character === "string") {
    currentUser.character = body.character;
  }
  if (body.image && typeof body.image === "string") {
    currentUser.image = body.image;
  }
  if (body.characterDirection && typeof body.characterDirection === "string") {
    currentUser.characterDirection = body.characterDirection;
  }

  res.send({ status: 1, message: "Success!" });
});

module.exports = router;
