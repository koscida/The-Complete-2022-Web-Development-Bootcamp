//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const _ = require("lodash")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

const mongooseDB = "mongodb://localhost:27017/wikiDB"
mongoose.connect(mongooseDB)

const articleSchema = {
	title: String,
	content: String
}
const Article = mongoose.model("Article", articleSchema)


// Requests targeting all articles
app.route("/articles")
	.get( (req, res) => {
		Article.find({}, (err, foundArticles) => {
			!err 
				? res.send(foundArticles) 
				: console.log(err)
		})
	})
	.post( (req, res) => {
		const article = new Article({
			title: req.body.title, 
			content: req.body.content
		})
		article.save((err, response) => {
			!err
				? res.send(response)
				: console.log(err)
		})
	})
	.delete( (req, res) => {
		Article.deleteMany({}, (err, response) => {
			!err
				? res.send(response)
				: console.log(err)
		})
	})

// Requests targeting specific article
app.route("/articles/:title")
	.get( (req,res) => {
		Article.findOne({title: req.params.title}, (err, foundArticle) => {
			!err
				? res.send(foundArticle)
				: console.log(err)
		})
	})
	.put( (req,res) => {
		const title = req.params.title
		const newArticle = {
			title: req.body.title, 
			content: req.body.content
		}
		Article.replaceOne({ title }, newArticle, (err, response) => {
			!err
				? res.send(response)
				: console.log(err)
		});
	})
	.patch( (req,res) => {
		Article.updateOne({title: req.params.title}, {$set: req.body}, (err, response) => {
			!err
				? res.send(response)
				: console.log(err)
		})
	})
	.delete( (req,res) => {
		Article.deleteOne({title: req.params.title}, (err, response) => {
			!err
				? res.send(response)
				: console.log(err)
		})
	})


app.listen(3000, () => {
	console.log("Server started on port 3000");
})