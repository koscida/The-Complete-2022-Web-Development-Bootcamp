//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongooseDB = "mongodb://localhost:27017/todoListDB"
mongoose.connect(mongooseDB)

// mongoose schema
const itemsSchema = {
	name: String
}
const listSchema = {
	name: String,
	items: [itemsSchema]
}

// mongoose model
const Item = mongoose.model("Item", itemsSchema)
const List = mongoose.model("List", listSchema)

// mongoose document
const item1 = new Item({
	name: "Buy Food",
	list: "list"
})
const item2 = new Item({
	name: "Cook Food",
	list: "list"
})
const item3 = new Item({
	name: "Eat Food",
	list: "list"
}) 
const defaultItems = [item1, item2, item3]


app.get("/", function(req, res) {
	res.redirect("/ToDo");
})

app.get("/:listName", function(req,res){
	const listNameRaw = req.params.listName
	let listName = listNameRaw.toLowerCase().replace(/([\W_])+/g,'-')
	
	List.findOne({name: listName}, (err, foundList) => {
		if(!foundList) {
			// insert new list
			const list = new List({
				name: listName,
				items: defaultItems
			})
			list.save()
			res.redirect("/" + listName);
		} else {
			const day = date.getDate()
			const listTitle = (listName.replaceAll('-'," ") + " " + day)
			res.render("list", {listTitle, listItems: foundList.items, listName});
		}
	})
})

app.post("/addItem", function(req, res){
	const name = req.body.newItem
	const listName = req.body.listName
	const item = new Item({name})
	List.findOne({name: listName}, (err, foundList) => {
		foundList.items.push(item)
		foundList.save()
		res.redirect("/" + listName);
	})
	
})

app.post("/deleteItem", (req, res) => {
	const _id = req.body.deleteItem
	const listName = req.body.listName
	List.findOneAndUpdate({name: listName}, {
		$pull: {items: {_id}}
	}, (err, foundList) => {
		if(!err)
			res.redirect("/" + listName);
		else
			console.log(err)
	})
	
})

app.get("/about", function(req, res){
	res.render("about");
})

app.listen(3000, function() {
	console.log("Server started on port 3000");
})
