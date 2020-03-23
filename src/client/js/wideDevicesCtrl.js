import domItems from "./domItems";
import { User } from "./User";
import {
    registrationScreen,
    moveSaveTripScreenToRight,
    onAddTripEvent,
    turnOffScreen
} from "./screensCtrl";
import { greetingUser, clearTripsListScreen } from "./createDom";
// import { updateTripsList } from "./createDom";

const {
    signInScreen,
    signUpScreen,
    splashScreen,
    registerUser,
    welcomeScreen,
    saveTripScreen,
    tripScreen,
    tripsListScreen,
    addTripBtnByClass,
    newNameInput,
    newPasswordInput,
    confirmPasswordInput,
    newUser
} = domItems;

export default function wideDevicesCtrl() {
    /** */
    tripsListScreen.classList.remove("move-right");
    if (tripScreen.style.display === "grid") {
        tripsListScreen.style.display = "grid";
        turnOffScreen([splashScreen, signInScreen]);
    }

    if (tripsListScreen.style.display === "grid") {
        tripScreen.style.display = "grid";
    }

    newUser.addEventListener("click", () => {
        signUpScreen.style.display = "flex";
        signInScreen.classList.add("move-right");
        splashScreen.classList.add("move-right");
        turnOffScreen([signInScreen, splashScreen]);
    });

    /** */
    registerUser.addEventListener("click", () => {
        const name = newNameInput.value;
        const password = newPasswordInput.value;
        const confirmedPassword = confirmPasswordInput.value;
        registrationScreen(password, confirmedPassword, name);
        clearTripsListScreen();
    });

    /*** */
    saveTripScreen.addEventListener("click", e => {
        if (e.target === domItems.cancelTrip) {
            tripsListScreen.style.display = "grid";
            tripScreen.style.display = "grid";
            moveSaveTripScreenToRight();
        }
    });

    /** */
    tripsListScreen.addEventListener("click", e => {
        if (e.target.closest(`.${addTripBtnByClass.className}`)) {
            onAddTripEvent();
        }
    });
}
