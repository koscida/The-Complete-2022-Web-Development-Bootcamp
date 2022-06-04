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

const today = new Date();
const options = {
	weekday: "long",
	day: "numeric",
	month: "long",
};
const weekday = today.toLocaleDateString("en-US", options);

app.get("/", (req, res) => {
	res.render("list", { 
		pageTitle: weekday, 
		weekday, 
		listType: "todo",
		items: items.filter(item => item.type==="todo") 
	});
});

app.post("/", (req, res) => {
	//console.log(req.body);
	items.push({item: req.body.newItem, type: req.body.submit});

	res.redirect("/" + req.body.submit);
});

app.get("/todo", (req, res) => res.redirect("/"))

app.get('/work', (req, res) => {
	res.render("list", { 
		pageTitle: "Work List", 
		weekday, 
		listType: "work",
		items: items.filter(item => item.type==="work") 
	});
})

app.get("/about", (req, res) => {
	res.render("about",{
		pageTitle: "About", 
	})
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000");
});
