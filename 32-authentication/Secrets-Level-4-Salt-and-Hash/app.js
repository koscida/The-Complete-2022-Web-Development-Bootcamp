//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
require('dotenv').config();
const saltRounds = 10

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`, {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
	email: String,
	password: String
})

const User = mongoose.model("User", userSchema)


app.get("/", (req, res) => {
	res.render("home")
})
app.get("/logout", (req, res) => {
	res.redirect("/")
})

app.get("/login", (req, res) => {
	res.render("login")
})
app.post("/login", (req, res) => {
	const email = req.body.email
	const password = req.body.password
	User.findOne({email}, (err, foundUser) => {
		if(err) {
			console.log(err)
			res.render("login")
		} else {
			if(foundUser) {
				bcrypt.compare(password, foundUser.password, (error, result) => {
					if(result)
						res.render("secrets")
					else {
						console.log("password does not match")
						res.render("login")
					}
				})
			} else {
				console.log("no user found")
				res.render("login")
			}
		}
	})
})

app.get("/register", (req, res) => {
	res.render("register")
})
app.post("/register", (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
		const newUser = new User({
			email: req.body.email,
			password: hash
		})
		newUser.save((err) => {
			if(err) {
				console.log(err)
				res.render("register")
			} else {
				res.render("secrets")
			}
		})
	})
	
})





app.listen(3000, () => {
	console.log("Server started on port 3000");
})