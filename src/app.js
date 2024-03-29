const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const port = process.env.PORT || 3000                       //process.env   environment var

// Define Path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars Engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {            //Route Handler 
    res.render('index', {
        title: 'Weather',
        name: 'Aditya'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aditya'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is Help Text',
        title: 'Help ',
        name: 'Aditya'
    })
})
app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            'error': 'You Must Provide a Search Term'
        })
    }
    console.log(req.query.search)
    res.send({
        product :[]
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You Must Provide a Address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address : req.query.address

            })


        })
    })
    // res.send({
    //     location: "Nashik",
    //     temp: "20",
    //     address:req.query.address
    // })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditya',
        errorMessage: 'Help article Not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditya',
        errorMessage: 'Page Not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})