const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  ranknum: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Users", UsersSchema);