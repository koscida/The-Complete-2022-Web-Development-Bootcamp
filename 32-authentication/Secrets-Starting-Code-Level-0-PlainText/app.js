//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose")

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = {
	email: String,
	password: String
}

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
		} else {
			if(foundUser) {
				if(foundUser.password === password){
					res.render("secrets")
				}
			}
		}
	})
})

app.get("/register", (req, res) => {
	res.render("register")
})
app.post("/register", (req, res) => {
	const newUser = new User({
		email: req.body.email,
		password: req.body.password
	})
	newUser.save((err) => {
		err
			? console.log(err)
			: res.render("secrets")
	})
})





app.listen(3000, () => {
	console.log("Server started on port 3000");
})