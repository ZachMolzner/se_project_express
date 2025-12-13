const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// GET /items — return all clothing items
router.get("/", getItems);

// POST /items — create a new item
router.post("/", createItem);

// DELETE /items/:itemId — delete item by _id
router.delete("/:itemId", deleteItem);

// PUT /items/:itemId/likes — like an item
router.put("/:itemId/likes", likeItem);

// DELETE /items/:itemId/likes — unlike an item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
