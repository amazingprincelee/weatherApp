const { response } = require("express");
const express = require("express")
const app = express();
const https = require("https");
const bodyParSer = require("body-parser");

app.use(bodyParSer.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");   
})

app.post("/", function(req, res){
    

    const query = req.body.cityName;
    const apiKey = "f90927a5433b0f7faa4134c3dc990cfb"
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&appid=" +apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode)

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const location = weatherData.name;
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + ".png"

            res.write("<p>The weather is currently " + weatherDescription + "</P>")
            res.write("<h1>The weather temparature in " + location + " is " + temp + " degree celcus</h1>")
            res.write("<img src=" + imageUrl + ">");
            res.send()

            console.log(temp)
            console.log(weatherDescription)
        })

       
    })
})






app.listen("3000", function(){
 console.log("Your server is running on port 3000")
})