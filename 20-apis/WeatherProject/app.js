//jshint esversion: 6
const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req,res) => {
	res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {
	
	// Lat + Long API call
	//const API_URI = "https://api.openweathermap.org/data/2.5/weather?lat=39.952583&lon=-75.165222&exclude=hourly,daily&appid=12979c2c7e6c56280281d7c29dc06004&units=imperial&exclude=hourly,daily"
	
	// City Name call
	//const cityName = "Philadelphia"
	const cityName = req.body.cityName
	const appid = '12979c2c7e6c56280281d7c29dc06004';
	const units = 'imperial'
	const API_URI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appid + "&units=" + units
	
	https.get(API_URI, (response) => {
		console.log(response.statusCode)
		
		response.on('data', (data) => {
			const weatherData = JSON.parse(data)
			
			const temp = weatherData.main.temp
			const description = weatherData.weather[0].description
			const icon = weatherData.weather[0].icon
			const imgSrc = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
			
			res.write('<img src="' + imgSrc + '" alt="icon of ' + description + '" />')
			res.write('<p>The temperature in ' + cityName + ' is ' + temp + ' F</p>')
			res.write('<p>The weather is currently ' + description + '</p>')
			res.write('<a href="/">Back</a>')
			res.send()
		})
	})
	
	// res.send('server is running')
})



app.listen(3000, () => console.log('Server is running on port 3000'))