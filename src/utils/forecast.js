const request = require("request")
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d554dd8bb6adb1033843bd1d0c7e46a3&query=' + latitude + ',' +longitude 
    
    request({ url: url, json: true }, (error, {body}) => {          //earlier(error, response) but as we only need body part of reponse  destructring
        if (error) {
            callback("Unable to Connect to Weather Service!", undefined) 
        } else if (body.error) {   //earlier response.body
            callback("Unable to find the Location !", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is Currently " + body.current.temperature + " degrees out But it feels like " + body.current.feelslike + " degree"+" The Wind direction is "+body.current.wind_dir+" with speed of "+body.current.wind_speed+" knots")
        
        }
    })
}

module.exports = forecast;