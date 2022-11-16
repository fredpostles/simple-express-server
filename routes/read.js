const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // const results = await req.asyncMySQL(getUser(req.headers.token));

  // if (results.length === 0) {
  //   res.send({ status: 0, error: "User not found" });
  //   return;
  // }

  // res.send({ status: 1, result: results[0] });

  res.send(req.currentUser);
});

module.exports = router;
