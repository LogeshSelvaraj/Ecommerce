const mongoose = require("mongoose");
const {Types:{ObjectId}}=mongoose.Schema

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      lowercase: true
    },category:{
        type:ObjectId,
        required:"parent category is required",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("subcategory", SubCategorySchema);
