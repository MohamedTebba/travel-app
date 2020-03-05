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

const {loginBtn, nameInput, passwordInput} = domItems

const users = new UserList()

loginBtn.addEventListener('click', () => {
    const userName = nameInput.value
    const userPassword = passwordInput.value
    login(users, userName, userPassword)
})

