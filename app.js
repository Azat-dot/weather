const express = require('express');
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post('/', function(req, res){
  
  
  const marks = "metric"
  const apiKey = "bb59f98888b79a7bd27512f5705696ac"
  const place = req.body.cityName
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&units=" + marks + "&lang=en&appid=" + apiKey + "&lang=ru"

https.get(url, function(response){
  console.log(response.statusCode);

  response.on('data', function(data) {
    const weatherData = JSON.parse(data)
    const temp = weatherData.main.temp
    const descr = weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    const imageURL =  "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<h1>Temperature in " + place + " is " + temp + " point</h1>");
    res.write(`<h2>Weather right now is ${descr} </h2>`);
    res.write("<img src=" + imageURL + ">");
    res.send()
  })
})
})
  




app.listen(3000, function(){
  console.log("Server is running in Localhost 3000");
})


