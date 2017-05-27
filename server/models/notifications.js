var mongoose= require('mongoose')

var notificationSchema = mongoose.Schema({
  title: String,
  text: String,
  status: String,
  user: String,
  date: {
    type: Date,
    default: Date.now()
  }
})

var Notifications = mongoose.model("notifications", notificationSchema)
module.exports = Notifications