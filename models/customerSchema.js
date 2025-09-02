const mongoose = require("mongoose");
const schema = mongoose.Schema;
const userSchema = new schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  age: Number,
  contry: String,
  gender: String,
});

const User = mongoose.model("customer", userSchema);

module.exports = User;
