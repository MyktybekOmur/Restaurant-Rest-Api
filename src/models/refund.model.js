const mongoose = require("mongoose");

const mealsShema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  refund_meal: { type: mongoose.Schema.ObjectId, ref: "meals" },
});
const meal = mongoose.model("refund_meal", mealsShema).schema;

const refundShema = new mongoose.Schema(
  {
    total_count: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    storeId: { type: mongoose.Schema.ObjectId, ref: "users" },
    meals: [meal],
    date: {
      type: Date,
      required: true,
    },
  },
  { collection: "refunds", timestamps: true }
);

const refund = mongoose.model("refunds", refundShema);

module.exports = refund;
