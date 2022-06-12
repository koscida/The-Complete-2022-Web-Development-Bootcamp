const { MongoClient } = require("mongodb");
const assert = require('assert')

// Replace the uri string with your MongoDB deployment's connection string.
// const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
const uri = "mongodb://localhost:27017" ;

const dbName = 'fruitsDB'

const client = new MongoClient(uri);

async function run() {
	try {
		await client.connect();

		// get the database
		const database = client.db(dbName);
		// get the collection (table)
		const fruits = database.collection('fruits');

		// Query fruit named 'Banana'
		const query = { name: 'Banana' };
		const fruit = await fruits.findOne(query);
		console.log(fruit);
		
		
		// Insert fruit into the db
		// const doc = { name: "Apple", shape: "round" };
		// const result = await fruits.insertOne(doc);
		// console.log(
		// 	`A document was inserted with the _id: ${result.insertedId}`,
		// );
		
		// query fruit again
		const fruitAll = await fruits.find({_id:{$not: 0}});
		console.log(fruitAll);

	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);