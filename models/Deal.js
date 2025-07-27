// const mongoose_Deal = require("mongoose");
// const { Schema } = mongoose_Deal;

// const DealSchema = new Schema(
//   {
//     itemName: { type: String, required: true }, // e.g., 'Onions'
//     targetQuantity: { type: Number, required: true }, // e.g., 50 (in kg)
//     currentQuantity: { type: Number, default: 0 },
//     pricePerUnit: { type: Number, required: true }, // e.g., 20 (in ₹/kg)
//     unit: { type: String, default: "kg" },
//     status: {
//       type: String,
//       enum: ["active", "filled", "confirmed", "cancelled"],
//       default: "active",
//     },
//     marketArea: { type: String, required: true },
//     createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose_Deal.model("Deal", DealSchema);

const mongoose_Deal = require("mongoose");
const { Schema } = mongoose_Deal;

const DealSchema = new Schema(
  {
    itemName: { type: String, required: true },
    targetQuantity: { type: Number, required: true },
    currentQuantity: { type: Number, default: 0 },
    pricePerUnit: { type: Number, required: true },
    unit: { type: String, default: "kg" },
    status: {
      type: String,
      enum: ["active", "filled", "confirmed", "cancelled"],
      default: "active",
    },
    marketArea: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // *** NEW: Track which vendors have archived this deal ***
    archivedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose_Deal.model("Deal", DealSchema);
