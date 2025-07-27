const mongoose_Participation = require("mongoose");
const { Schema } = mongoose_Participation;

const ParticipationSchema = new Schema(
  {
    dealId: { type: Schema.Types.ObjectId, ref: "Deal", required: true },
    vendorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

// Ensure a vendor can only join a specific deal once
ParticipationSchema.index({ dealId: 1, vendorId: 1 }, { unique: true });

module.exports = mongoose_Participation.model(
  "Participation",
  ParticipationSchema
);
