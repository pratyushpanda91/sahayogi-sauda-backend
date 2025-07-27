const mongoose_User = require("mongoose");
const { Schema } = mongoose_User;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["vendor", "supplier"], required: true },
    marketArea: { type: String, required: true, trim: true }, // e.g., 'Burla Market'
  },
  { timestamps: true }
);

module.exports = mongoose_User.model("User", UserSchema);
