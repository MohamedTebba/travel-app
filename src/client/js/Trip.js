export class Trips {
    constructor() {
        this.trips = [];
    }

    addTrip(trip) {
        const storedTrips = JSON.parse(localStorage.getItem("tripsList"));
        if (storedTrips) {
            storedTrips.push(trip);
            localStorage.setItem("tripsList", JSON.stringify(storedTrips));
        } else {
            this.trips.push(trip);
            localStorage.setItem("tripsList", JSON.stringify(this.trips));
        }
        this.trips = JSON.parse(localStorage.getItem("tripsList"));
    }
    
    getTripByID(id) {
        return this.trips.filter(trip => trip.id === id)
        // return this.trips
    }

    getTripsList() {
        const storedTrips = JSON.parse(localStorage.getItem("tripsList"));
        this.trips = storedTrips;
        return storedTrips
    }

    deleteTrip(id) {
        const stordTrips = JSON.parse(localStorage.getItem("tripsList"));
        const newTripsList = stordTrips.filter(trip => trip.id !== id);
        localStorage.setItem("tripsList", JSON.stringify(newTripsList));
        this.trips = newTripsList;
    }

    clearTripsList() {
        this.trips = [];
    }

    addPacking(id, packing) {
        // this.packing.push(packing)
        const trip = this.trips.filter(trip => trip.id === id)[0]
        trip.packing.push(packing)
        const index = this.trips.findIndex(trip => trip.id === id)
        this.trips.splice(index, 1, trip)
        localStorage.setItem("tripsList", JSON.stringify(this.trips));

    }
}

export class Trip {
    constructor(id, URL, summary, weather, icon, placename, city, fullTime) {
        this.id = id;
        this.imgURL = URL;
        this.summary = summary;
        if (typeof weather === Object) {
            this.temperature = {
                high: weather.high,
                low: weather.low
            };
        } else {
            this.temperature = weather;
        }
        this.icon = icon;
        this.placename = placename;
        this.city = city;
        this.fullTime = fullTime;
        this.packing = []
    }

}
