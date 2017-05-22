var express = require("express")
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var favicon = require('express-favicon')
var logger = require("morgan")
var passport = require("passport")
var app = express()

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
mongoose.connect("mongodb://127.0.0.1/Spincleanix")
console.log("Connected to database")

app.use("/assets", express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.set('view engine', 'ejs')

app.use((req, res, next)=> {
	res.setHeader('Access-Control-Allow-Origin','*')
	res.setHeader('Access-Control-Allow-Headers','content-type')
	console.log(`URL ${req.originalUrl}, Request body: `, req.body)
	next()
})

app.get('/', (req, res)=> {
  res.render("login")
})


app.all('/admin', (req, res)=> {
  res.sendFile(__dirname +"/public/index.html")
})

app.all('*', (req, res)=> {
	res.json({url: req.url})
})

app.listen(port, function(err) {
	if (err) console.log(err)
	console.log("Shit is going down on port ", port)
})



/*var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://laundry-app-3508e.firebaseio.com"
});*/