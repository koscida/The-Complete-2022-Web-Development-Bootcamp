const mongoose = require('mongoose')

// Connect to the MongoDB using Mongoose
const uri = "mongodb://localhost:27017" ;
const dbName = 'fruitsDB'
mongoose.connect(uri+"/"+dbName)

// Create schemas for the collections
const fruitSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a name']
	},
	rating: {
		type: Number,
		min: 1,
		max: 10,
	},
	review: String
})
const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a name']
	},
	age: {
		type: Number,
		min: 0,
		max: 130,
	},
	favoriteFruit: fruitSchema
})

// Create the models and set the schema
const Fruit = mongoose.model("Fruit", fruitSchema)
const Person = mongoose.model("Person", personSchema)


// Clear db
Fruit.find((err, fruits) => {
	err ? console.log(err)
		: fruits.forEach( fruit => 
			Fruit.deleteOne({_id: fruit._id}, (err) => {
				err ? console.log(err)
					: console.log("Successfully deleted fruit")
			})
		)
})
Person.find((err, people) => {
	err ? console.log(err)
		: people.forEach( person => 
			Person.deleteOne({_id: person._id}, (err) => {
				err ? console.log(err)
					: console.log("Successfully deleted person")
			})
		)
})


// Insert dummy data

// Insert fruits
const orange = new Fruit({
	name: 'Orange',
	rating: 3,
	review: "Ok"
})
const banana = new Fruit({
	name: 'Banana',
	rating: 5,
	review: "Good"
})
const kiwi = new Fruit({
	name: 'Kiwi',
	rating: 7,
	review: "Delicious"
})
Fruit.insertMany([orange, banana, kiwi], (err) => {
	if(err) console.log(err)
	else console.log("Successfully saved all fruits")
})

// Insert people
const john = new Person({
	name: 'John',
	age: 37,
})
john.save()

const amy = new Person({
	name: 'Amy',
	age: 12,
	favoriteFruit: kiwi,
})
amy.save()

// Update a person
Fruit.updateOne({name: 'John'},{favoriteFruit: orange}, (err) => {
	if(err)
		console.log(err)
	else
		console.log("Successfully updated fruit")
})
