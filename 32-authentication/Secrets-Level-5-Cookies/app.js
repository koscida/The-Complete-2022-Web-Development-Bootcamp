//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


mongoose.connect(`mongodb://localhost:27017/${process.env.MONGO_DB}`, {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
	username: String,
	password: String
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model("User", userSchema)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.get("/", (req, res) => {
	res.render("home")
})
app.get("/logout", (req, res) => {
	req.logout()
	res.redirect("/")
})

app.get("/login", (req, res) => {
	res.render("login")
})
app.post("/login", (req, res) => {
	const username = req.body.username
	const password = req.body.password
	
	const user = new User({
		username, password
	})
	
	req.login(user, (err) => {
		if(err) {
			console.log(err)
			res.redirect("/login")
		} else {
			passport.authenticate("local")(req, res, () => {
				res.redirect("/secrets")
			})
		}
	})
})

app.get("/register", (req, res) => {
	res.render("register")
})
app.post("/register", (req, res) => {
	User.register({username: req.body.username}, req.body.password, (err, user) => {
		if(err) {
			console.log(err)
			res.redirect("/register")
		} else {
			passport.authenticate("local")(req, res, () => {
				res.redirect("/secrets")
			})
		}
	})
})

app.get("/secrets", (req, res) => {
	if(req.isAuthenticated()) {
		res.render("secrets")
	} else {
		res.redirect("/login")
	}
})





app.listen(3000, () => {
	console.log("Server started on port 3000");
})