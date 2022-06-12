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
	name: String,
	age: Number,
})

// Create the models and set the schema
const Fruit = mongoose.model("Fruit", fruitSchema)
const Person = mongoose.model("Person", personSchema)

// Insert single data
const fruit = new Fruit({
	name: 'Apple',
	rating: 7,
	review: "Awesome"
})
const person = new Person({
	name: 'John',
	age: 7,
})
// fruit.save()
// person.save()

// Insert bulk data
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
// Fruit.insertMany([orange, banana, kiwi], (err) => {
// 	if(err) console.log(err)
// 	else console.log("Successfully saved all fruits")
// })

// Find All
Fruit.find((err, fruits) => {
	if(err)
		console.log(err)
	else {
		fruits.forEach(f=>console.log(f))
		// fruits.forEach(f=>console.log(f.name))
		// mongoose.connection.close()
	}
		
})

// Test validation
const badFruit = new Fruit({
	rating: 7,
	review: "Awesome"
})
// badFruit.save()

// Update one
// Fruit.updateOne({name: 'Banana'},{rating: 4}, (err) => {
// 	if(err)
// 		console.log(err)
// 	else
// 		console.log("Successfully updated fruit")
// })

// Delete One
// Fruit.deleteOne({name: 'Banana'}, (err) => {
// 	if(err)
// 		console.log(err)
// 	else
// 		console.log("Successfully deleted fruit")
// })

// Person.deleteMany({name: 'John'}, (err) => {
// 	if(err)
// 		console.log(err)
// 	else
// 		console.log("Successfully deleted person")
// })