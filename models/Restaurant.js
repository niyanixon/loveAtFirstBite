const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  style: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);