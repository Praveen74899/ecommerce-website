const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },

    // CATEGORY ID
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // COLORS
    colors: {
      type: [String],
      default: [],
    },

    // BED SHEET SPECIFIC FIELDS
    fabric: { type: String, required: true },         // Cotton, Satin etc.
    bedsheetSize: { type: String, required: true },   // Single, Double, King, Queen 

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
