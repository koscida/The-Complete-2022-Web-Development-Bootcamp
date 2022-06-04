//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

// create app
const app = express();

// set body parser
app.use(bodyParser.urlencoded({ extended: true }));
// set view engine to ejs
app.set("view engine", "ejs");
// use the public folder
app.use(express.static('public'))

// set variables
let items = [];

app.get("/", (req, res) => {
	//res.sendFile(__dirname + "/index.html");
	const today = new Date();
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};
	const weekday = today.toLocaleDateString("en-US", options);

	res.render("list", { weekday, items });
});

app.post("/", (req, res) => {
	const newListItem = req.body.newItem;
	//console.log(newListItem);

	items.push(newListItem);

	res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000");
});
