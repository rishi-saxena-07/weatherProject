const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "4216a0bb86b7742bfab8616123858515";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const discp = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>Currently weather is " + discp + " in " + query + ".<p>");
      res.write("<h1>Temperature in " + query + " is " + temp + " degree Fahrenheit.</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});


app.listen(3000, function() {
  console.log("Server is listning on port 3000.");
});
