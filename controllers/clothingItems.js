const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const handleError = (err, res) => {
  console.error(err);

  if (err.name === "CastError" || err.name === "ValidationError") {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Invalid data passed to the request" });
  }

  if (err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ message: err.message });
  }

  if (err.statusCode === FORBIDDEN) {
    return res.status(FORBIDDEN).send({ message: err.message });
  }

  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error has occurred on the server" });
};

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => handleError(err, res));
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => handleError(err, res));
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item with the specified ID not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        const error = new Error("Forbidden");
        error.statusCode = FORBIDDEN;
        throw error;
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => res.send(deletedItem))
    .catch((err) => handleError(err, res));
};

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
