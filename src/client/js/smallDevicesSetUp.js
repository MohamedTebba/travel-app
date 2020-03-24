import domItems from "./domItems";
import {
    registrationScreen,
    moveSaveTripScreenToRight,
    onAddTripEvent,
    turnOffScreen
} from "./screensCtrl";
import { clearTripsListScreen } from "./createDom";

const {
    signInScreen,
    signUpScreen,
    splashScreen,
    registerUser,
    saveTripScreen,
    tripScreen,
    tripsListScreen,
    cancelTrip,
    getStarted,
    newUser,
    addTripBtnByClass,
    addTripBtnById,
    confirmPasswordInput,
    newPasswordInput,
    newNameInput
} = domItems;

export default function smallDevicesSetUp() {

    if (tripScreen.style.display === "grid") {
        tripsListScreen.classList.add("move-right");
    }

    /** */
    getStarted.addEventListener("click", () => {
        signInScreen.style.display = "flex";
        splashScreen.classList.add("move-right");
    });

    /** */
    newUser.addEventListener("click", () => {
        signUpScreen.style.display = "flex";
        signInScreen.classList.add("move-right");
    });

    /** */
    registerUser.addEventListener("click", () => {
        const name = newNameInput.value;
        const password = newPasswordInput.value;
        const confirmedPassword = confirmPasswordInput.value;
        registrationScreen(password, confirmedPassword, name);
        clearTripsListScreen();
        tripScreen.style.display = "grid";
    });

    /*** */
    saveTripScreen.addEventListener("click", e => {
        if (e.target === cancelTrip) {
            moveSaveTripScreenToRight();
            tripsListScreen.style.display = "grid";
            tripScreen.style.display = "grid";
        }
    });

    /** */
    tripsListScreen.addEventListener("click", e => {
        if (e.target.closest(`.${addTripBtnByClass.className}`)) {
            onAddTripEvent();
        }
    });

    /** */
    tripScreen.addEventListener("click", e => {
        if (e.target.closest(`#${addTripBtnById.id}`)) {
            saveTripScreen.classList.remove("move-right");
            turnOffScreen(tripScreen);
        }
    });
}
