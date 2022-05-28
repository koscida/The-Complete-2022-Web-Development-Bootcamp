//jshint esversion:6

// /////
// npm init
// npm install express
// nodemon server.js


const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

// get request for root
app.get("/", (req,res) => {
	//console.log(req)
	
	console.log(__dirname) // will be root folder of front-end
	res.sendFile(__dirname + "/index.html")
})

// post request for root
app.post("/", (req, res) => {
	const result = Number(req.body.num1) + Number(req.body.num2)
	res.send("Result: " + result)
})
// npm install body-parser

// set up get route to contact page
app.get("/contact", (req,res) => {
	res.send("<p>Contact me</p>")
})

app.listen(3000, () => {
	console.log("server started on port 3000")
})