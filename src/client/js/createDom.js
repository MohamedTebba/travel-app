import domItems from "./domItems";
import { User } from "./User";
import { toCelsius, counter } from "./utils";

const user = new User();
const {
    userNameHeader,
    tripDestination,
    tripDestinationImg,
    tripDestinationWeatherIcon,
    tripDestinationWether,
    tripToDestinationCounter,
    tripContainer,
    tripScreen,
    packingSection,
    packingContainer
} = domItems;

/**shows welcome message for the new user */
export function greetingUser() {
    const userName = user.getUserName();
    userNameHeader.innerHTML = `hi ${userName},`;
}

/** function that updates the trip screen*/
export function updateTripUI(id, location, res, time) {
    tripScreen.setAttribute('id', id);
    tripContainer.innerHTML = "";
    const icon = res.icon;
    const newContent = `<div class="trip__from"> <span>from</span> <h1>london</h1></div>
    <div class="trip__to"><span>to</span>  <h1>${location}</h1></div>
    <div class="trip__img" style="background-image: linear-gradient(#FFFFFB 0%,
        rgba(38, 38, 38, .35) 40%, rgba(38, 38, 38, .35) 50%, rgba(38, 38, 38, .35) 75%, #FFFFFB 100%),
    linear-gradient(rgba(38, 38, 38, .35) 0%, rgba(38, 38, 38, .35) 100%), url(${
        res.imgURL
        })">
        <div class="trip__wether-icon">
            <img src="https://darksky.net/images/weather-icons/${icon}.png" alt="weather-icon-not-available">
        </div>
        <p class="trip__weather">
            typical weather for then is:
            ${
        res.temperature.high
            ? `<span>high:  ${toCelsius(res.temperature.high)}°</span>
    <span>low:  ${toCelsius(res.temperature.low)}°</span>
    `
            : `<span>apparently:  ${toCelsius(res.temperature)}°</span>`
        }
    ${res.summary ? res.summary : "no summary is available"}
        </p>
    </div>
    <span class="trip__counter">${location} is ${counter(time)} away.
    </span>`;
    tripContainer.insertAdjacentHTML("afterbegin", newContent);
}

/**function that updates the trips list screen */
export function updateTripsList(tripsList) {
    const fragment = document.createDocumentFragment();
    tripsList.forEach(trip => {
        const tripCard = document.createElement("div");
        tripCard.setAttribute("class", "trips-list__card");
        tripCard.setAttribute("id", `${trip.id}`);
        const span = document.createElement("span");
        const destination = document.createTextNode(trip.placename);
        const icon = document.createElement("i");
        icon.setAttribute("class", "fas fa-map-marker-alt");
        icon.style.marginRight = "4px";
        span.appendChild(icon);
        span.appendChild(destination);
        const deleteBtn = document.createElement("a");
        deleteBtn.setAttribute("class", "trips-list__delete-btn");
        const deleteBtnText = document.createTextNode("delete");
        deleteBtn.appendChild(deleteBtnText);
        const viewBtn = document.createElement("a");
        viewBtn.setAttribute("class", "trips-list__view-btn");
        const viewBtnText = document.createTextNode("view");
        const btnContainer = document.createElement("div");
        btnContainer.setAttribute("class", "trips-list__btn-container");
        viewBtn.appendChild(viewBtnText);
        btnContainer.appendChild(deleteBtn);
        btnContainer.appendChild(viewBtn);
        tripCard.appendChild(btnContainer);
        tripCard.appendChild(span);
        tripCard.style.backgroundImage = `linear-gradient(0deg,#262626 0%, rgba(38, 38, 38, .35) 30%, rgba(38, 38, 38, .35) 100%),url(${trip.imgURL})`;
        fragment.appendChild(tripCard);
    });
    document.querySelector(".inner-container").innerHTML = "";
    document.querySelector(".inner-container").appendChild(fragment);
}

/**select the desired trip to be displayed */
export function viewTrip(id, tripsList) {
    const selectedTrip = tripsList.filter(trip => trip.id === id);
    updateTripUI(selectedTrip[0].id,selectedTrip[0].city, selectedTrip[0], selectedTrip[0].fullTime);
}

/**fucntion that clears trips list screen after emptying the storage */
export const clearTripsListScreen = () => {
    clearTripScreen();
    document.querySelector(".inner-container").innerHTML = "";
};

/**fucntion that clears the trip screen*/
export const clearTripScreen = () => {
    const defaultContent = `<p class="trip__weather">
    none to show, click on a trip or start by adding one!
    </p>
    `;
    tripContainer.innerHTML = "";
    tripContainer.insertAdjacentHTML("afterbegin", defaultContent);
};

/**function to create the packing list */
export const packingItemsScreen = (destination, packing) => {
    // packingSection.innerHTML = ''
    packingContainer.innerHTML = ''
    const destinationElement = `<h1 class="packing__dest">Trip to ${destination}</h1>`
    packingContainer.insertAdjacentHTML('afterbegin', destinationElement)
    let packElement =''
    packing.forEach(pack => {
        packElement+=`<li><span><i class="far fa-square"></i>${pack.item}</span><span class="qnt">${pack.itemQnt}</span></li>`
    })
    // const addBtn = `<span class="packing__add-item"><i class="fas fa-plus"></i>add item</span>`
    

    const ul = document.createElement('ul')
    ul.setAttribute('class', 'packing__list')
    packingContainer.insertAdjacentElement('beforeend',ul)
    ul.insertAdjacentHTML('afterbegin', packElement)
    // ul.insertAdjacentHTML('beforeend', addBtn)
    // ul.insertAdjacentElement('beforeend', span)
    // span.insertAdjacentHTML('afterbegin', i)
    
}
