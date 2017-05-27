var express= require("express")
var router = express.Router()
var Users = require("../models/users")
var Orders = require("../models/orders")
var Notifications = require("../models/notifications")


router.use((req, res, next)=> {
	res.setHeader('Access-Control-Allow-Origin','*')
	res.setHeader('Access-Control-Allow-Headers','content-type')
	//console.log(`${req.method} ${req.originalUrl}, Request body is: `, req.body)
	next()
})

router.get('/', (req, res) => {
  res.json({api: "this is the api page"})
})


/****************************************************************
------------------------------------------------------------------
                          USERS
-----------------------------------------------------------------
*****************************************************************/

router.post('/users/get', (req, res) => {
  let email = req.body.email
  console.log(req.body)
  Users.findOne({email: email}, {username:1, email:1, status:1 }, (err, user) => {
    if (err) console.log(err.message)
    res.json({result: user})
  })
})

router.get('/users/delete/:id', (req, res) => {
  let id = req.params.id
  Users.findByIdAndRemove(id, (err, user) => {
    if (err) console.log(err.message)
    res.json({result: user})
    console.log("User deleted")
  })
})

router.post('/users/create', (req, res) => {
  let details = req.body
  console.log(details)
  Users.create(details, (err, result) => {
    if (err) console.log(err)
    delete result.password
    delete result.created_date
    delete result.status
    res.json({result: result})
    console.log("New user created", result)
  })
})

router.post('/users/update', (req, res) => {
  let id = req.body._id
  let details = req.body
  console.log(details)
  Users.findByIdAndUpdate(id, details, (err, result) => {
    if (err) console.log(err.message)
    delete result.password
    delete result.created_date
    delete result.status
    res.json({result: result})
    console.log("User updated")
  })
})



/****************************************************************
------------------------------------------------------------------
                    NOTIFICATIONS
-----------------------------------------------------------------
*****************************************************************/

router.post('/notifications', (req, res) => {
  if(!req.body.title) return;
  let body = req.body
  var notification = new Notifications
  notification.title= body.title
  notification.text= body.text
  notification.user= body.user
  notification.status= "sent"
  notification.save(err => {
    if (err) console.log(err)
    console.log("Added a new notification", notification)
    res.json({result: "New notification added"})
  })
})

router.get('/notifications/:user', (req, res) => {
  user = req.params.user
  Notifications.find({$or: [{user: user}, {user: 'all'}]}, (err, notices) => {
    console.log("Notification sent")
    res.json({result: notices})
  })
})



/****************************************************************
------------------------------------------------------------------
                        ORDERS
-----------------------------------------------------------------
*****************************************************************/


router.post('/orders/create', (req, res, next) => {
  var body = req.body
  console.log(body)
  if(!body.customer && !body.phone && !body.user){
    return next();
  }
  var order = new Orders()
  order.customer = body.customer
  order.phone = body.phone
  order.email = body.email
  order.price = body.price
  order.address = body.address
  order.packages = body.packages
  order.status = "pending"
  order.date = Date.now()
  order.delivery = body.delivery
  order.user = body.user
  order.save(err => {
    if(err) console.log(err)
    res.json({result: order})
    console.log("saved")
  })
})

router.post('/orders/update', (req, res, next) => {
  id = req.body.id
  console.log(req.body)
  if (!id) return next();
  Orders.findOneAndUpdate({user: id}, details, {upsert: true, new: true}, (err, result) => {
    if (err) console.log(err.message)
    res.json({result: result.id})
    console.log("New user")
  })
})

router.get('/orders/delete/:id', (req, res, next) => {
  let id = req.params.id
  Orders.findByIdAndRemove(id, (err, result) => {
    if (err) console.log(err.message)
    res.json({result: result})
    console.log("New user")
  })
})

router.get('/orders/get/:id', (req, res, next) => {
  let id = req.params.id
  if (!id) return next();
  console.log("User id", id)
  Orders.find({user: id}, (err, orders) => {
    if (err) console.log(err.message)
    res.json({result: orders})
  })
})

router.all('*', (req, res) => {
  console.log("did not work")
  res.json({api: "hello hacker"})
})

module.exports = router