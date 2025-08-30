const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userName = new schema({
  userNameee: String,
});
const TheUserName = mongoose.model("TheUserName", userName);
module.exports = TheUserName;
