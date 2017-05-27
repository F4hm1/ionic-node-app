var admin = require("firebase-admin")
var fs = require("fs")
var express = require("express")
var mongoose = require("mongoose")
var Users = require("./models/users")
var Orders = require("./models/orders")
var serviceAccount = require("./laundry-app-3508e-firebase-adminsdk-cq3i4-8183ca6d46.json")
var app = express()

mongoose.connect("mongodb://127.0.0.1/spincleanix", (err)=> {
  if (err) console.log(err)
  console.log("Connected to mongodb")
})

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "laundry-app-3508e",
    clientEmail: "firebase-adminsdk-cq3i4@laundry-app-3508e.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDnE+fqJ4WHbWWr\nWJUTLonXZpSghBEnv2H7qL+H/MsqVVFo379KZ0dddjW0lMIl/tUQvI26RKyXwXdP\nt8QtoYoxkX3VhfGsxG/rVu66t1621eWkUQkyteTtPCxokL4sgwK1shRWm3esw8iX\nKnvCeyq/Y3jVUFKao2j2QGdhgP82J3dIojbSGAcq3cOSS3yLEaC/Ne4dpbFNk8Vu\nWu4+19tcZhEA7D3WSJan9Yp91BUhyPXgG2SuiUXBm6MeFBLSaBfuHtMe/1NGMtIP\nfc2RVmKpfJg/1bdnaY/EEtQZSR2kYf0r+vJ1ftsOd3fx35JP32DzZ9sn+QDJC+3q\nNHb+cz19AgMBAAECggEAFB2GfbqtBAoA5LaUW5QcibSzUXnNqIEffXHGIodeBDRj\nHtcDZu2wp7Enoa2lbPtO/uL7D3D0+UztHvJnUHWUexYoNxMu45RCDeGGbJiT1SSv\nles7+r8cy44Ga5/V/jf1X22+GX/1HgP5DTe0iEyCfyCgnykb17xL4cvfc/xvuv3w\nKife8aLc77xr9teEz7Q3y8pYcWIc1XoTRzvF74IHvv+iyu8WQ8LsTCeXTCEXUQJR\nc6gmbt67U630goah7Pl1KVUDj8r4Lhj64MhMOM/TjJTgY4i013SxREl8csZTfyRI\nhtXumPlqq+F+Hc8uatv/kSk8eG87EklEABY2b460fQKBgQD2JjKVM/Cn83GlYAin\nCUj2DnkK/EcaONehWvDFaJNjlMBr+r5WJX38A91mFabfpbweH52hwffk/z/YpArW\n71Ku7HlAcFr2cgy0pe4J8jPtQD3FI9XdYkud+snDmHx7/gLvb3gV9D1Gdmx4/Ndv\n9LzCXOB6FT8CTAioK9V933VKZwKBgQDwU00TH57uvPK0jbw7FtmyLwx7N4MEaOus\nHd4l/1PkjO+mQUhICh/+nUdUB5e3nI33Y3FT3Nre9+EZkOo03BD2L6I2V6eMv/5n\nSKluZy0ITobkUniK/dLW9AP41+hlRlpm2UEO5sIRSEvh3a87FEMiGnbK8XG52ry4\nJ10zG3DSewKBgQDbAG8+yqCSfYmejswD+cHdklDlkkGctfg8CpJvwTRphB6Ts9sH\nAIKP58xjGF6JW4b88jooglCRgPyIPqOaSgIxuhnDWHPGEwD09TDNzp2et+p9bP3J\n47vNiiVbjl8rXnu0FmQsfErMV275UlRHuuL6tvHODPsriwSkw6NGQ7uyfwKBgCm7\nDUMo1nw2Kx7XDbxk92BNcyliNknpviKg/RY0A+lH38VKyLZZq7yWqvAYcWvcr3op\ntmANlaPp/xhlZYXQQNG+67fr+JgkLpTYtTMKj3NFz36OI4hfEuFoddgcBaqwULpT\nN0zTHRfLKgIKcIcduZqOZdpPmqPfK63+h9x8A1dJAoGBAN9LcoFEQdBXiWUrYfdm\nC9qKmDV66A0uwr6E16Wf7Ay8vpnLJTTV/4LgeZB3YBreAeqTZSSKnEPdIWzEaNfj\n74WPmyt10EVWfTJVUqm/D8L2oIafvNzSBclzn2cq8K6BK4VogHp1In35Zx0GNddF\nc/9f8spMhUbvvw89NIShA0Sv\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://laundry-app-3508e.firebaseio.com"
});

console.log("Firebase initialized")

