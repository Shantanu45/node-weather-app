const path = require("path")
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rajat'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helptext: "here to help",
        title: 'help',
        name: 'rajat'
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: 'about me',
        name: 'rajat'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location: location,
                address: req.query.address
            })
        })

    })
})



app.get('/help/*', (req, res)=>{
    res.send("help article not found")
})

app.get('*', (req, res)=>{
    res.send("my 404 page")
})

app.listen(3000, () => {
    console.log('server is up on post 3000')
})