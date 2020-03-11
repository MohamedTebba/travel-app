let projectData = {}

var path = require('path')
//require envirement variables
const fetch = require('node-fetch')
// import fetch from 'whatwg-fetch'
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const bodyParser = require('body-parser')
const {getName} = require('country-list')

const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

const user_name = process.env.USER_NAME
const darksky_key = process.env.DARKSKY_KEY
const pixabay_key = process.env.PIXABAY_KEY

app.post('/', (req, res) => {
    const placename = req.body.placename
    const fullTime = req.body.fullTime
    const dateOnly = req.body.dateOnly
    projectData = {
        placename,
        fullTime,
        dateOnly
    }

})



app.get('/', async(req, res) => {

    const place = encodeURIComponent(projectData.placename)
    const fullTime = projectData.fullTime
    console.log(projectData.dateOnly)
    const dateOnly = new Date(projectData.dateOnly).getTime()/1000
    console.log('yes dateonly',dateOnly)

    const dt = fullTime? new Date(fullTime)/1000 : null
    console.log('date: ', dt)
    console.log('place:',place)
    console.log('fullTime:',fullTime)
    const geoResponse = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${place}&maxRows=10&username=${user_name}`)

    try {
        const geoData = await geoResponse.json()
        console.log('geodata done')
        const index = Math.round(Math.random()*geoData.postalCodes.length)
        // console.log(index)

        const darkSkyResponse = projectData.fullTime ?
         await fetch(`https://api.darksky.net/forecast/${darksky_key}/${geoData.postalCodes[index].lat},${geoData.postalCodes[index].lng},${dt}`):
         await fetch(`https://api.darksky.net/forecast/${darksky_key}/${geoData.postalCodes[index].lat},${geoData.postalCodes[index].lng}`)

        
    try {
        const darkSkyData = await darkSkyResponse.json()
        console.log('darkSkydata done')
        
        try {
            const pixabayResponse = await fetch(`https://pixabay.com/api/?key=${pixabay_key}&q=${encodeURIComponent(darkSkyData.timezone.split('/')[1].toLowerCase())}&image_type=photo`)

            const pixabayData = await pixabayResponse.json()
            console.log('pixabay done')

            console.log('gotten name from timezone: ', darkSkyData.timezone.split('/')[1].toLowerCase().replace("_", " "))
            
            const expectedHit = pixabayData.hits.filter(hit => hit.tags.includes(darkSkyData.timezone.split('/')[1].toLowerCase().replace("_", " ")))
            // console.log(expectedHit)
            let hitIndex = Math.round(Math.random()*expectedHit.length) === expectedHit.length ? Math.round(Math.random()*expectedHit.length)-1 : Math.round(Math.random()*expectedHit.length)
            let currentDay
            if(dateOnly){
                console.log('dateOnly: ' ,dateOnly)
                currentDay = darkSkyData.daily.data.filter((obj,i) => new Date(obj.time*1000).getDate() === new Date(dateOnly*1000).getDate() )
            }
            console.log('yes data ',currentDay)

            console.log(darkSkyData.daily)
            // res.send([geoData, darkSkyData, pixabayData, expectedHit[hitIndex]])
            res.send({
                imgURL:expectedHit[hitIndex].webformatURL,
                summary:fullTime?darkSkyData.currently.summary:currentDay[0].summary,
                temperature:fullTime? darkSkyData.currently.temperature:{
                    low:currentDay[0].temperatureLow,
                    high:currentDay[0].temperatureHigh
                },
                icon:fullTime?darkSkyData.currently.icon:currentDay[0].icon
            })
        
            
        } catch (error) {
            
            console.log('server 1:',error)
            res.send(`coudn't fetch data from pixabay with ${error}`)
        }

        
    } catch (error) {
        console.log('server 2: ',error)
        res.send(`coudn't fetch data from darksky with ${error}`)
    }
    
} catch (error) {
    console.log('server 3: ', error)
    res.send(`coudn't fetch data from geodata with ${error}`)
}
})

const port = 8000

app.listen(port, async() => {
    console.log(`App listening on port ${port}!`)
   
})