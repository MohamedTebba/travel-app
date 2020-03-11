import domItems from "./domItems"
import UserList from './userData'

const users = new UserList()
const {userNameHeader, tripDestination, tripDestinationImg, tripDestinationWeatherIcon, tripDestinationWether, tripToDestinationCounter} = domItems

const toCelsius = fTemp => {
    return Math.round((fTemp-32)*(5/9))
}

const counter = (flightTime) => {
    const leftTimeInSeconds = ((flightTime - Date.now())/1000)

    return ` ${Math.round(leftTimeInSeconds/86400)?`${Math.round(leftTimeInSeconds/86400)>1?`${Math.round(leftTimeInSeconds/86400)} days`:`${Math.round(leftTimeInSeconds/86400)} day`}` : ` ${Math.round(leftTimeInSeconds/3600)?`${Math.round(leftTimeInSeconds/3600)>1? `${Math.round(leftTimeInSeconds/3600)} hours`:`${Math.round(leftTimeInSeconds/3600)} hour`}` :`${Math.round(leftTimeInSeconds/60)?`${Math.round(leftTimeInSeconds/60) > 1?`${Math.round(leftTimeInSeconds/60)} minutes`:`${Math.round(leftTimeInSeconds/60)} minute`}` :''}`} ` }  `

}

export function greetingUser(){
const userName = users.getUserName()
userNameHeader.innerHTML = `hi ${userName},`
}

export function updateTripUI(location, res, time) {

    tripDestination.innerHTML = location

    tripDestinationImg.style.backgroundImage = `linear-gradient(#FFFFFB 0%,
        rgba(38, 38, 38, .35) 40%, rgba(38, 38, 38, .35) 50%, rgba(38, 38, 38, .35) 75%, #FFFFFB 100%),
    linear-gradient(rgba(38, 38, 38, .35) 0%, rgba(38, 38, 38, .35) 100%), url(${res.imgURL})`

    tripDestinationWether.innerHTML = `
    typical weather for then is:
    ${res.temperature.high? `<span>high:  ${toCelsius(res.temperature.high)}°</span>
    <span>low:  ${toCelsius(res.temperature.low)}°</span>
    `:`<span>temp:  ${toCelsius(res.temperature)}°</span>`
    }
    ${res.summary ? res.summary:'no summary is available'}
    `
    tripToDestinationCounter.innerHTML = `${location} is ${counter(time)} away.`
    const icon = res.icon 

    tripDestinationWeatherIcon.src = `https://darksky.net/images/weather-icons/${icon}.png`
    tripDestinationWeatherIcon.alt = icon+'icon'
    

}