var admin = require("firebase-admin")
var express = require("express")
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var favicon = require('express-favicon')
var logger = require("morgan")
var passport = require("passport")
var serviceAccount = require("./laundry-app-3508e-firebase-adminsdk-cq3i4-8183ca6d46.json")
var app = express()
var api = require("./routes/api.js")
var orders = require("./routes/orders.js")
// var init = require('./logic/passport-init')
// var User = require('./models/user')
// var frontEnd = require('./routes/front')
// var backEnd = require('./routes/back')
// require('dotenv').config()

//init(passport, app)

// app.use(session({secret: 'ekeneOwnsPinhub'}))
// app.use(flash())
// app.use(passport.session())


var port = 4012
mongoose.connect("mongodb://127.0.0.1/spincleanix")
console.log("Connected to database")

app.use("/assets", express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.set('view engine', 'ejs')


app.use("/api", api)

app.get('/login', (req, res)=> {
  res.render("lockscreen")
})
app.all('/melvin', (req, res)=> {
  res.render("admin")
})
app.get('/', (req, res)=> {
  res.redirect("/login")
})

app.all('*', (req, res)=> {
	res.json({url: req.url})
})
app.listen(port, function(err) {
	if (err) console.log(err)
	console.log("Shit is going down on port ", port)
})
