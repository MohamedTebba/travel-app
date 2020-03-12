//Import styles
import './styles/standard.scss'
import './styles/colors.scss'
import './styles/basic.scss'
import './styles/splashScreen.scss'
import './styles/formSection.scss'
import './styles/welcomeScreen.scss'
import './styles/saveTrip.scss'
import './styles/trip.scss'
import './styles/tripsList.scss'
import './styles/pageAnimation.scss'

//Import js files
import UserList from './js/userData'
import domItems from './js/domItems'
import mobileUIController from './js/mobileUIController'
import deskUIController from './js/deskUIController'
import './js/mobileMenu'
import login from './js/login'
import {getData, postData} from './js/API'
const { getCode } = require('country-list')
import {Trips, Trip} from './js/createTrip'
import {updateTripUI, updateTripsList} from './js/createTheDom'
// const cities = require("all-the-cities")
// import cities from 'all-the-cities'

//Import fontawesome icons
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faLuggageCart } from "@fortawesome/free-solid-svg-icons/faLuggageCart";
import { faHotel } from "@fortawesome/free-solid-svg-icons/faHotel";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";


library.add(faLuggageCart);
library.add(faHotel);
library.add(faPlus);
library.add(faMapMarkerAlt);
library.add(faList);
dom.watch();

document.addEventListener('click', e => e.preventDefault())
const tripsList = new Trips()

onload = () => {

    if(innerWidth >= 768) {
        deskUIController()
    }else {
        mobileUIController()
    }
    
}

onresize = () => {

    if(innerWidth >= 768) {
        deskUIController()
    }else{
        mobileUIController()
    }
    
}

const {loginBtn, nameInput, passwordInput, saveTripBtn, tripDateInput, tripTimeInput, tripCityInput, tripCountryInput} = domItems

const users = new UserList()

loginBtn.addEventListener('click', () => {
    const userName = nameInput.value
    const userPassword = passwordInput.value
    login(users, userName, userPassword)
})

// document.querySelector('.image-test').style.backgroundImage=`url('https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')`

// console.log(url)

saveTripBtn.addEventListener('click', () => {
    
    const city = tripCityInput.value
    const country = tripCountryInput.value
    const departingTime = tripTimeInput.value
    const departingDate = tripDateInput.value
    const location = city+' '+country
    
    const fullTime = new Date(departingDate+' '+departingTime).getTime()
    const dateOnly = new Date(departingDate+' 00:00:00')
    // console.log(fullTime >= Date.now())

    const sevenDaysFromNow = Date.now()+6.048e+8
    
    

    if(city && country && departingDate && departingTime) {

        if(fullTime < Date.now()){
            alert('You have put a past date, try again!')
        }else{
            
            if(fullTime > sevenDaysFromNow) {
                


                console.log('within 7 days',sevenDaysFromNow > fullTime)
                console.log(location)
                postData('http://localhost:8000/', {placename:location, fullTime, dateOnly:false})
                getData('http://localhost:8000/')
                .then((res) => {
                    
                  console.log(res)
                    
                    updateTripUI(city, res, fullTime)

                    const newTrip = new Trip(1)
                    newTrip.setImgURL(res.imgURL)
                    newTrip.setSummary(res.summary)
                    newTrip.setIcon(res.icon)
                    newTrip.setWeather({
                        high: res.temperature.high,
                        low: res.temperature.low
                    })
                   newTrip.setTravelingLocation(location)
                    tripsList.addTrip(newTrip)
                    console.log(tripsList.trips)
                    updateTripsList(tripsList.trips)
                    
                })


                
            }else{
               
                console.log('within 7 days',sevenDaysFromNow > fullTime)
                console.log(location)
                postData('http://localhost:8000/', {placename:location, fullTime:false, dateOnly})
                getData('http://localhost:8000/')
                .then((res) => {
                    
                    console.log(res)

                    updateTripUI(city, res, fullTime)
                    
                    const newTrip = new Trip(1)
                    newTrip.setImgURL(res.imgURL)
                    newTrip.setSummary(res.summary)
                    newTrip.setIcon(res.icon)
                    newTrip.setWeather({
                        high: res.temperature.high,
                        low: res.temperature.low
                    })
                   newTrip.setTravelingLocation(location)
                    tripsList.addTrip(newTrip)
                    console.log(tripsList.trips)
                    updateTripsList(tripsList.trips)
                    
                })
                
            }
        }
        
        
    }
})


