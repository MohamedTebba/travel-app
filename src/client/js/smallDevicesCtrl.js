import domItems from './domItems'
import {registrationScreen, moveSaveTripScreenToRight, onAddTripEvent, turnOffScreen} from './screensCtrl'
// import registerNewUser from './newUser'
import {User} from './User'
import {greetingUser, clearTripsListScreen} from './createDom'
import { v4 as uuidv4 } from 'uuid'

const {signInScreen, signUpScreen, splashScreen, registerUser, welcomeScreen , saveTripScreen, tripScreen, tripsListScreen, cancelTrip, getStarted, newUser, humbergerMenu, mobileMenu, saveTripBtn,  addTripBtnByClass, addTripBtnById, confirmPasswordInput, newPasswordInput, newNameInput } = domItems

export default function mobileUIController () {

        if(tripScreen.style.display === 'grid') {
            // tripsListScreen.style.display = 'none'
            tripsListScreen.classList.add("move-right");
            
        }

        /** */
        getStarted.addEventListener('click', () => {
            signInScreen.style.display = 'flex'
            splashScreen.classList.add('move-right')            
            
        })
        
        /** */
        newUser.addEventListener('click', () => {
            signUpScreen.style.display = 'flex'
            signInScreen.classList.add('move-right')

        })
        
        /** */
        registerUser.addEventListener('click', () => {
            const name = newNameInput.value
            const password = newPasswordInput.value
            const confirmedPassword = confirmPasswordInput.value
            registrationScreen(password, confirmedPassword, name)
            clearTripsListScreen()
            
        })
        
        /*** */
        saveTripScreen.addEventListener('click', (e) => {
            if(e.target === cancelTrip) {
                // if(tripsListScreen.style.display !== 'grid') {
                // }
                tripsListScreen.classList.add('move-right')
                tripsListScreen.style.display = 'grid'
                
                // if(tripScreen.style.display === 'none') {
                    // tripsListScreen.style.display = 'none'
                    tripScreen.style.display = 'grid'

                // }
                moveSaveTripScreenToRight()
                
            }
        })
        
        /** */
        tripsListScreen.addEventListener('click', (e) => {
            if(e.target.closest(`.${addTripBtnByClass.className}`)){
                onAddTripEvent()
            }
        })
        
        /** */
        tripScreen.addEventListener('click', (e) => {
            if(e.target.closest(`#${addTripBtnById.id}`)){
                saveTripScreen.classList.remove('move-right')
                turnOffScreen(tripScreen)
            }
        })
        
    
}