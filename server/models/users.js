var mongoose= require('mongoose')
var bcrypt = require("bcrypt-nodejs")

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: Number,
  address: String,
  status: {
    type: String,
    default: 'new'
  },
  password: String,
  created_date: {
    type: Date,
    default: Date.now()
  }
})

var Users = mongoose.model("users", userSchema)
module.exports = Users