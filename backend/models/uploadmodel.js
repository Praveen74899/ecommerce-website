const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,  // ← BESTSELLER PRODUCTS ke liye optional
      default: null,
    },

    colors: {
      type: [String],
      default: [],
    },

    fabric: { type: String,  },


    description: {
      type: String,
      required: true,
    },

    mainImage: {
      type: String,
      required: true,
    },

    subImages: {
      type: [String],
      default: [],
    },

    bestSellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BestSeller",
      required: false,
      default: null,
    },

    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);