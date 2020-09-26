const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email Address is required"],
    unique: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "is invalid"],
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, "is required"],
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    unique: true,
  },
  name: {
    type: String,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    required: [true, "is required"],
  },
  gender: {
    type: String,
    lowercase: true,
    required: [true, "is required"],
  },
  dob: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["student", "teacher", "parent"],
  },
}, {
  timestamps: true,
});

// generateAuthToken
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({
      _id: user._id.toString(),
    },
    process.env.JWT_SECRET
  );
  return token;
};

userSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};

userSchema.statics.findByCredentials = async function(email, passowrd) {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(passowrd, user.password);
  if (isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

module.exports = User = mongoose.model("User", userSchema);