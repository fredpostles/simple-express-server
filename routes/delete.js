const express = require("express");
const router = express.Router();

router.delete("/", (req, res) => {
  // find user to delete
  const indexOfItem = req.simpsons.findIndex((item) => {
    return item.id === req.currentUser.id;
  });

  req.simpsons.splice(indexOfItem, 1);
  res.send({ status: 1 });
  return;

  // res.send({ status: 0, error: "Item not found" });
});

module.exports = router;
