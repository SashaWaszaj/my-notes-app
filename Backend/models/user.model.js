const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "The name is required"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "The password is required"],
    minlength: [8, "The password has to have at least 8 characters"]
  }
});

//Hash
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    } catch (err) {
      next(err);
    }
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;