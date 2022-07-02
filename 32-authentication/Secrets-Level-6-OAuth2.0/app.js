//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const findOrCreate = require("mongoose-findorcreate")

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
	email: String,
	password: String,
	secret: String,
	googleId: String,
	githubId: String
})

userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)

const User = mongoose.model("User", userSchema)

passport.use(User.createStrategy())
passport.serializeUser(function(user, cb) {
	process.nextTick(function() {
		cb(null, { id: user.id, username: user.username, name: user.name });
	});
});

passport.deserializeUser(function(user, cb) {
	process.nextTick(function() {
		return cb(null, user);
	});
});

passport.use(
	new GoogleStrategy({
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/auth/google/secrets'
	}, 
	function(accessToken, refreshToken, profile, cb) {
		User.findOrCreate({ googleId: profile.id }, function (err, user) {
			return cb(err, user);
		});
	})
)
passport.use(
	new GitHubStrategy({
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: "http://localhost:3000/auth/github/secrets"
	},
	function(accessToken, refreshToken, profile, done) {
		User.findOrCreate({ githubId: profile.id }, function (err, user) {
			return done(err, user);
		});
	})
);


app.get("/", (req, res) => {
	res.render("home")
})
app.get("/logout", (req, res) => {
	req.logout(function(err) {
		if (err) { return next(err); }
		res.redirect('/');
	});
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

app.get("/submit", (req, res) => {
	if(req.isAuthenticated()) {
		res.render("submit")
	} else {
		res.redirect("/login")
	}
})
app.post("/submit", (req, res) => {
	const newSecret = req.body.secret
	console.log(req.user.id)
	
	User.findById(req.user.id, (err, foundUser) => {
		if(err) {
			console.log(err)
			res.redirect("/secrets")
		} else {
			if(foundUser) {
				foundUser.secret = newSecret
				foundUser.save(() => {
					res.redirect("/secrets")
				})
			}
		}
	})
})

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });
  
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/secrets', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });





app.listen(3000, () => {
	console.log("Server started on port 3000");
})