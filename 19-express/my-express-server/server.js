//jshint esversion:6

// /////
// npm init

// /////
// npm install express

// ///
// npm install -g nodemon
// - global
// nodemon server.js

// // /////
// // Build express server
// // 1. require express
// const express = require('express')
// // 2. get express
// const app = express()
// // 3. listen on port
// app.listen(3000)

// // 4. start server
// // node server


// // /////
// // add callbacks to server
// //		this is all server-side only
// //		no code written to GET in browser
// const express = require('express')
// const app = express()
// app.listen(3000, () => {
// 	console.log("server started on port 3000")
// })


// /////
// add get request
const express = require('express')
const app = express()

// get request
//	param 1: home root -> "/"
//	param 2: callback for response
//	request is just the browser's request to the server
app.get("/", (request, response) => {
	// console log will happen server-side
	console.log(request)
	//
	// add response
	response.send("Hello")
})

// set up new route
app.get("/contact", (req,res) => {
	res.send("<p>Contact me</p>")
})

app.listen(3000, () => {
	console.log("server started on port 3000")
})