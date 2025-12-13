const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

// Centralized error handler for this controller
const handleError = (err, res) => {
  console.error(err);

  // Bad ID format or bad input data
  if (err.name === "CastError" || err.name === "ValidationError") {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Invalid data passed to the request" });
  }

  // Not found (from orFail)
  if (err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ message: err.message });
  }

  // Default fallback
  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error has occurred on the server" });
};

// GET /items — return all clothing items
module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => handleError(err, res));
};

// POST /items — create a new item
module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => handleError(err, res));
};

// DELETE /items/:itemId — delete item by ID
module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("Item with the specified ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => handleError(err, res));
};

// PUT /items/:itemId/likes — like an item
module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item with the specified ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => handleError(err, res));
};

// DELETE /items/:itemId/likes — unlike an item
module.exports.dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item with the specified ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.send(item))
    .catch((err) => handleError(err, res));
};
