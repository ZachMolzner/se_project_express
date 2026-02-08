const ClothingItem = require("../models/clothingItem");

const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed to the request"));
      }
      return next(err);
    });
};

module.exports.deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Item with the specified ID not found"))
    .then((item) => {
      // owner might be ObjectId, user._id might be string depending on your auth middleware
      const ownerId = item.owner.toString();
      const userId = req.user._id.toString
        ? req.user._id.toString()
        : req.user._id;

      if (ownerId !== userId) {
        throw new ForbiddenError("Forbidden");
      }

      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => res.send(deletedItem))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data passed to the request"));
      }
      return next(err);
    });
};

module.exports.likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item with the specified ID not found"))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data passed to the request"));
      }
      return next(err);
    });
};

module.exports.dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item with the specified ID not found"))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data passed to the request"));
      }
      return next(err);
    });
};
