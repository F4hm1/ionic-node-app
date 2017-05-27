var mongoose= require("mongoose")

var status = {
  values: ["pending", "processing", "done"],
  messsage: 'Status only accepts "pending", "processing", "done"'
}
var ordersSchema = mongoose.Schema({
  customer: String,
  phone: Number,
  email: String,
  price: Number,
  address: String,
  status: {
    type: String,
    enum : status,
  },
  packages: {},
  delivery: Boolean,
  user: {
    type: String,
    required: true
  },
  date: Date,
})

var Orders = mongoose.model("orders", ordersSchema)

module.exports= Orders