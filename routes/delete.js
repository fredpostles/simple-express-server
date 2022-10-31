const express = require("express");
const router = express.Router();

router.delete("/:id", (req, res) => {
  // const idAsNumber = Number(req.params.id);

  // check that valid number was sent in
  // if (!idAsNumber) {
  //   res.send({ status: 0, error: "No item id set" });
  //   return;
  // }

  const indexOfItem = req.simpsons.findIndex((item) => {
    return item.id === req.currentUser.id;
  });

  req.simpsons.splice(indexOfItem, 1);
  res.send({ status: 1 });
  return;

  // res.send({ status: 0, error: "Item not found" });
});

module.exports = router;
