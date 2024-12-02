const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Instance methods
userSchema.methods.saveUser = function () {
  return this.save();
};

// Static methods
userSchema.statics.findUserByID = function (id) {
  return this.findById(id);
};

userSchema.statics.findByMail = function (mail) {
  return this.findOne({ mail });
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
