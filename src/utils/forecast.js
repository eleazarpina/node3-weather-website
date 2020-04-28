//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=652c7a9f6ea1c063fa4fa09fd8ada9f9'

    // destructuring url .... response como sólo ocupa body, vamos cambiando
    request({ url, json: true}, (error, { body }) => {
        // console.log(response.body) 
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }  else if (body.error) {
            callback('Unable to find location', undefined)
        }  else if (body.message) {
            callback(body.message, undefined)
        } else {
            callback(undefined, { temp :body.main.temp, humidity: body.main.humidity } )
        }
    })


}

module.exports = forecast                   