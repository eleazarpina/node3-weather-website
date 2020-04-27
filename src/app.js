const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ema Pina'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Ema Pina'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }


    // latitude longi location se reemplazzan en el callback destructuring
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {

        if (error) {
            return res.send({
                error
            })
        } else {
            // console.log('Error', error)
            // console.log('Data', data)

            forecast(latitude, longitude, (error, forecastData) => {

                if (error) {
                return res.send({
                    error
                    })
                }
                

                // const {latitude, longitude, location} = data            

                // console.log('Error', error)
                // console.log('GeoData', latitude, longitude, location)
                // console.log('ForecastData', forecastData)

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            }) 
        }

    })



    
})

app.get('/products', (req, res) => {
    res.send({
        products: [ 'Va a nevar', 'leche', 'huevos']
        
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text',
        title: 'Help',
        name: 'Ema Pina'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {        
        title: 'Page not found',
        errorMessage: 'Help article not found',
        name: 'Ema Pina'
    })    
})

app.get('*', (req, res) => {
    res.render('404', {        
        title: '404',
        errorMessage: 'Page not found',
        name: 'Ema Pina'
    })    
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {    
//     // res.send('Help page')
//     // res.send({
//     //     Name: 'Ema',
//     //     Age: 2
//     // })
//     // res.send([ {
//     //     name: 'Ema'
//     // }, {
//     //     name: 'Carolina'
//     // }, {
//     //     name: 'Eleazar'
//     // }])
// })

// app.get('/about', (req, res) => {
//     res.send('<html><head><title>ABOOOOOUT</title></head><body><h1>About</h1></body></html>')
// })


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})