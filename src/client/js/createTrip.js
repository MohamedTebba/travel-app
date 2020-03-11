export class Trips {

    constructor(){
        this.trips = []
    }

    addTrip(trip) {
        this.trips.push(trip)
        
    }
    
}

export class Trip {
    
    constructor(id) {
        this.id = id
    }

    setImgURL(URL) {
        this.URL = URL
    }

    setSummary (summary) {
        this.summary = summary
    }

    setWeather(weather) {
        this.temp = weather
    }

    setIcon(icon) {
        this.icon = icon
    }

    setTravelingLocation(placename) {
        this.placename = placename
    }

}