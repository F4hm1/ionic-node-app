var express= require("express")
var router = express.Router()
var Orders = require("../models/orders")


router.use((req, res, next)=> {
	res.setHeader('Access-Control-Allow-Origin','*')
	res.setHeader('Access-Control-Allow-Headers','content-type')
	next()
})

router.post('/create', (req, res, next) => {
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
  order.delivery = body.delivery
  order.user = body.user
  order.save(err => {
    if(err) console.log(err)
    res.json({result: "order created"})
    console.log("saved")
  })
})

router.post('/update/:id', (req, res, next) => {
  id = req.params.id
  if (!id) return next();
  Orders.findOneAndUpdate({user: id}, details, {upsert: true, new: true}, (err, result) => {
    if (err) console.log(err.message)
    res.json({result: result.id})
    console.log("New user")
  })
})
router.post('/delete/:id', (req, res, next) => {
  id = req.params.id
  if (!id) return next();
  Orders.findOneAndRemove({user: id}, (err, result) => {
    if (err) console.log(err.message)
    res.json({result: result.id})
    console.log("New user")
  })
})

router.get('/get/:id', (req, res) => {
  let id = req.params.id
  if (!id) return
  Orders.find({user: id}, (err, orders) => {
    if (err) console.log(err.message)
    res.json({result: orders})
  })
})
router.get('*', (req, res) => {
  console.log("did not wirrk")
  res.json({api: "this is the orders page"})
})

module.exports = router