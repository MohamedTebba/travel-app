import domItems from "./domItems";
import { toggleLog } from "./User";
import { login } from "./utils";
const {
    loginBtn,
    nameInput,
    passwordInput,
    signInScreen,
    splashScreen,
    tripScreen,
    tripsListScreen,
    saveTripScreen
} = domItems;

export default function loginScreen(userName, userPassword) {
    if (login(userName, userPassword)) {
        setTimeout(() => {
            signInScreen.classList.add("move-right");
            splashScreen.classList.add("move-right");
        }, 100);

        saveTripScreen.style.display = "flex";
        saveTripScreen.classList.add("move-right");
        if (innerWidth >= 768) {
            tripsListScreen.style.display = "flex";
            tripScreen.style.display = "flex";
        } else {
            tripsListScreen.style.display = "grid";
            tripScreen.style.display = "grid";
        }
        nameInput.value = "";
        passwordInput.value = "";
    }
}
