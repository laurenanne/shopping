const express = require("express");
const ExpressError = require("./expressError");
const router = new express.Router();
const items = require("./fakeDb");

// Get list of items on the list
router.get("/", function (req, res) {
  return res.json({ items });
});

// post a new item to shopping list
router.post("/", function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  return res.json({ added: newItem });
});

//display items name and price
router.get("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  return res.json({ item: foundItem });
});

//modifies an items name or price
router.patch("/:name", function (req, res) {
  const foundItem = items.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  return res.json({ updated: foundItem });
});

// Delete item from the shopping list
router.delete("/:name", function (req, res) {
  const index = items.findIndex((i) => i.name === +req.params.name);
  if (index === -1) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(index, 1);
  return res.json({ message: "Deleted" });
});

module.exports = router;
