const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
require('dotenv').config();

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const email = req.body.email
	
	const data = {
		members: [
			{
				email_address: email,
				email_type: 'html',
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
                	LNAME: lastName,
				}
			}
		]
	}
	const jsonData = JSON.stringify(data)
	console.log(jsonData)
	
	const url = "https://" + process.env.MAILCHIMP_DC + ".api.mailchimp.com/3.0/lists/" + process.env.MAILCHIMP_LISTID
	const auth = 'apikey:' + process.env.MAILCHIMP_APIKEY
	
	const options = {
		method: 'POST',
		auth: auth,
		Authorization: auth
	}
	
	const request = https.request(url, options, (response) => {
		
		if(response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html")
		} else {
			res.sendFile(__dirname + "/failure.html")
			console.log(response)
		}
		
		response.on('data', (data) => {
			const parsedData = JSON.parse(data)
			//console.log(parsedData)
		})
	})
	request.write(jsonData)
	request.end()
})

app.listen(process.env.PORT || 3000, () => {
	console.log("Server running on port 3000")
})