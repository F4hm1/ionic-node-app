var mongoose= require("mongoose")
var bcrypt = require("bcrypt-nodejs")

var orderSchema = mongoose.schema({
  customer: String,
  phone: Number,
})