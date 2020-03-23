import domItems from "./domItems";
import { User } from "./User";
import { greetingUser } from "./createDom";
import { Trips } from "./Trip";
import { registrationNewUser } from "./utils";

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
    tripCityInput,
    tripCountryInput,
    tripDateInput,
    tripTimeInput,
    humbergerMenu,
    mobileMenu
} = domItems;
const tripsList = new Trips();

export const turnOffScreen = elements => {
    if (elements.length) {
        setTimeout(() => {
            elements.forEach(e => {
                e.style.display = "none";
            });
        }, 500);
    } else {
        setTimeout(() => {
            elements.style.display = "none";
        }, 500);
    }
};

export const registrationScreen = (password, confirmedPassword, name) => {
    if (registrationNewUser(password, confirmedPassword, name)) {
        welcomeScreen.style.display = "flex";
        setTimeout(() => {
            signUpScreen.classList.add("move-right");
        }, 100);
        setTimeout(() => {
            welcomeScreen.classList.add("fade-out");
        }, 3000);
        setTimeout(() => {
            turnOffScreen(welcomeScreen);
        }, 3500);
        turnOffScreen([signUpScreen, splashScreen]);
        saveTripScreen.style.display = "flex";
        saveTripScreen.classList.remove("move-right");
        greetingUser();
    } else {
        alert("passwords do not match!");
    }
};

export const moveSaveTripScreenToRight = () => {
    setTimeout(() => {
        saveTripScreen.classList.add("move-right");
    }, 500);
};

export const onAddTripEvent = () => {
    // tripScreen.style.display = 'none'
    saveTripScreen.classList.remove("move-right");
    // tripsListScreen.style.display = 'none'
    turnOffScreen([tripScreen, tripsListScreen]);
};

export const onSavingATrip = (currentTime, currentDate) => {
    tripScreen.style.display = "grid";
    tripsListScreen.style.display = "flex";
    setTimeout(() => {
        saveTripScreen.classList.add("move-right");
    }, 500);
    tripCityInput.value = "";
    tripCountryInput.value = "";
    tripTimeInput.value = currentTime;
    tripDateInput.value = currentDate;
};

export const onLoginEvent = () => {
    signInScreen.style.display = "none";
    splashScreen.style.display = "none";
    // saveTripScreen.style.display = 'none'
    tripScreen.style.display = "grid";
    tripsListScreen.style.display = "flex";
    saveTripScreen.style.display = "flex";
};

export const onLogoutEvent = () => {
    signInScreen.style.display = "flex";
    if (innerWidth >= 768) {
        splashScreen.style.display = "flex";
    } else {
        splashScreen.style.display = "grid";
    }

    signInScreen.classList.remove("move-right");
    splashScreen.classList.remove("move-right");
    tripsListScreen.style.display = "none";
    tripScreen.style.display = "none";
};

export const onMobileMenuEvent = () => {
    humbergerMenu.classList.toggle('toggle-burger')
    mobileMenu.classList.toggle('toggle-mobile-menu')
}