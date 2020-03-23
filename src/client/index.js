//Import styles
import "./styles/standard.scss";
import "./styles/colors.scss";
import "./styles/basic.scss";
import "./styles/splashScreen.scss";
import "./styles/formSection.scss";
import "./styles/welcomeScreen.scss";
import "./styles/saveTrip.scss";
import "./styles/trip.scss";
import "./styles/tripsList.scss";
import "./styles/pageAnimation.scss";
import "./styles/packingList.scss";

//Import js files
import { User, toggleLog } from "./js/User";
import domItems from "./js/domItems";
import mobileUIController from "./js/smallDevicesCtrl";
import wideDevicesCtrl from "./js/wideDevicesCtrl";
import { onSavingATrip, onLoginEvent, onLogoutEvent, onMobileMenuEvent } from "./js/screensCtrl";
// import "./js/mobileMenu";
import loginScreen from "./js/loginScreen";
const { getCode } = require("country-list");
import { Trips, Trip } from "./js/Trip";
import {
    updateTripUI,
    updateTripsList,
    viewTrip,
    clearTripScreen,
    packingItemsScreen
} from "./js/createDom";
import {
    logout,
    getCurrentDate,
    getCurrentTime,
    postData,
    getData
} from "./js/utils";
import { v4 as uuidv4 } from "uuid";

//Import fontawesome icons
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faLuggageCart } from "@fortawesome/free-solid-svg-icons/faLuggageCart";
import { faHotel } from "@fortawesome/free-solid-svg-icons/faHotel";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkerAlt";
import { faList } from "@fortawesome/free-solid-svg-icons/faList";
import { faSquare } from "@fortawesome/free-regular-svg-icons/faSquare";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
/**SET UP FONTAWESOME ICONS */
library.add(faLuggageCart);
library.add(faHotel);
library.add(faPlus);
library.add(faMapMarkerAlt);
library.add(faList);
library.add(faSquare);
library.add(faArrowLeft);
dom.watch();
let gottenID
const {
    loginBtn,
    logoutBtn,
    nameInput,
    passwordInput,
    saveTripBtn,
    tripDateInput,
    tripTimeInput,
    tripCityInput,
    tripCountryInput,
    tripScreen,
    saveTripScreen,
    tripsListScreen,
    signInScreen,
    splashScreen,
    yourTripsListBtn,
    mobileMenu,
    humbergerMenu,
    addItemBtn,
    addItemForm,
    addItemToPackingBtn,
    itemInput,
    itemQntInput,
    packingSection,
    yourPackingBtn,
    backArrow
} = domItems;
// const user = new User(uuidv4())
const tripsList = new Trips();
const user = JSON.parse(localStorage.getItem("user"));

/**SET UP CURRENT TIME AND DATE AS DEFULT VALUES */
const currentDate = getCurrentDate();
const currentTime = getCurrentTime();
tripDateInput.value = currentDate;
tripTimeInput.value = currentTime;
/**********************/

document.addEventListener("click", e => e.preventDefault());
/**CHECK THE DOCUMENT ON LOADING OR ON RESIZING FOR WIDTH CHANGE TO APPLY EITHER MOBILE SETTINGS OR DESKTOP SETTINGS */
onload = () => {
    if (innerWidth >= 768) {
        wideDevicesCtrl();
        if (tripsList.getTripsList()) {
            // tripsList.trips = 
            updateTripsList(tripsList.getTripsList());
        }
    } else {
        mobileUIController();
        if (tripsList.getTripsList()) {
            updateTripsList(tripsList.getTripsList());
        }
    }
};

onresize = () => {
    if (innerWidth >= 768) {
        wideDevicesCtrl();
        if (tripsList.getTripsList()) {
            updateTripsList(tripsList.getTripsList());
        }
    } else {
        mobileUIController();
        if (tripsList.getTripsList()) {
            updateTripsList(tripsList.getTripsList());
        }
    }
};

/**DISPLAY SCREENS AS USER IS LOGGED IN */
if (user) {
    if (user.logged) {
        onLoginEvent();
    }
}

loginBtn.addEventListener("click", () => {
    const userName = nameInput.value;
    const userPassword = passwordInput.value;
    loginScreen(userName, userPassword);
    if (tripsList.getTripsList()) {
        updateTripsList(tripsList.getTripsList());
    }
});

saveTripBtn.addEventListener("click", () => {
    const city = tripCityInput.value;
    const country = tripCountryInput.value;
    const departingTime = tripTimeInput.value;
    const departingDate = tripDateInput.value;
    const location = city + " " + country;

    const fullTime = new Date(departingDate + " " + departingTime).getTime();
    /**dateonly is for trips within the week**/
    const dateOnly = new Date(departingDate + " 00:00:00");

    const sevenDaysFromNow = Date.now() + 6.048e8;

    if (city && country && departingDate && departingTime) {
        /**CHECK IF THE USER ENTERED THE CORRECT DATE */
        if (fullTime < Date.now()) {
            alert("You have put a past date, try again!");
        } else {
            /**CHECK IF THE USER HAS ENTERED A DATE WITHIN THE WEEK OR FAR AWAY */
            if (fullTime > sevenDaysFromNow) {
                postData("http://localhost:8000/", {
                    placename: location,
                    fullTime,
                    dateOnly: false
                });
                getData("http://localhost:8000/*").then(res => {
                    const newTrip = new Trip(
                        uuidv4(),
                        res.imgURL,
                        res.summary,
                        res.temperature,
                        res.icon,
                        location,
                        city,
                        fullTime
                    );
                    console.log(newTrip.id)
                    updateTripUI(newTrip.id, city, res, fullTime);
                    tripsList.addTrip(newTrip);
                    updateTripsList(tripsList.getTripsList());
                    onSavingATrip(currentTime, currentDate);
                });
            } else {
                postData("http://localhost:8000/", {
                    placename: location,
                    fullTime: false,
                    dateOnly
                });
                getData("http://localhost:8000/*").then(res => {
                    const newTrip = new Trip(
                        uuidv4(),
                        res.imgURL,
                        res.summary,
                        res.temperature,
                        res.icon,
                        location,
                        city,
                        fullTime
                        );
                    console.log(newTrip.id)
                    updateTripUI(newTrip.id, city, res, fullTime);
                    tripsList.addTrip(newTrip);
                    updateTripsList(tripsList.getTripsList());
                    onSavingATrip(currentTime, currentDate);
                });
            }
        }
    } else {
        alert("All fields are required!");
    }
});

/**DISPLAY OR DELETE SELECTED TRIP FROM THE LIST */
document.querySelector(".inner-container").addEventListener("click", e => {
    if (e.target.className === "trips-list__view-btn") {
        viewTrip(e.target.parentElement.parentElement.id, tripsList.getTripsList());
        if (innerWidth <= 768) {
            tripsListScreen.classList.add("move-right");
        }
    }
    if (e.target.className === "trips-list__delete-btn") {
        tripsList.deleteTrip(e.target.parentElement.parentElement.id);
        updateTripsList(tripsList.getTripsList());
        clearTripScreen();
    }
});

logoutBtn.addEventListener("click", () => {
    logout();
    onLogoutEvent();
});

humbergerMenu.addEventListener('click', onMobileMenuEvent)

yourTripsListBtn.addEventListener('click', () => {
    if(innerWidth < 768) {
        console.log('your trips list')
        onMobileMenuEvent()
        // tripsListScreen.style.display = 'grid'
        // tripScreen.style.display = 'none'
        tripsListScreen.classList.remove("move-right");
    }
})

/**Packing */
packingSection.addEventListener('click', (e) => {
    if(e.target.closest('.'+addItemBtn.classList[0])) {
        addItemForm.classList.add('fade-in')
    }

    if(e.target.closest('#'+backArrow.id)){
        packingSection.classList.add('move-right')
    }
})

addItemForm.addEventListener('click', (e) => {
    if(e.target === addItemForm) {
        addItemForm.classList.remove('fade-in')
    }

    if(e.target === addItemToPackingBtn) {
        console.log('item has been added')
        const item = itemInput.value
        const itemQnt = itemQntInput.value
        if(item && itemQnt) {
            console.log(item, itemQnt, gottenID)
            tripsList.addPacking(gottenID, {
                item,
                itemQnt
            })
            const trip = tripsList.getTripByID(gottenID)[0]
            packingItemsScreen(trip.city, trip.packing)
            itemInput.value = ''
            itemQntInput.value = ''
            addItemForm.classList.remove('fade-in')
            
        }else{
            alert('all fields are required!')
        }
    }
})

yourPackingBtn.addEventListener('click', () => {
    onMobileMenuEvent()
    const id = tripScreen.id
    if(id){
        // console.log(dest.innerHTML)
        gottenID = id
        // const trip = tripsList.getTripByCity(dest.innerHTML)
        // console.log(trip)
        const trip = tripsList.getTripByID(gottenID)[0]
        packingItemsScreen(trip.city, trip.packing)
        packingSection.classList.remove('move-right')
    }else{
        alert('select a trip')
    }

})