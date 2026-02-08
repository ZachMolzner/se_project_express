const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

const { validateItemBody, validateId } = require("../middlewares/validation");

// Public
router.get("/", getItems);

// Protect everything below
router.use(auth);

// Protected + VALIDATED
router.post("/", validateItemBody, createItem);
router.delete("/:itemId", validateId, deleteItem);
router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
