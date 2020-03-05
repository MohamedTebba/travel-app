import domItems from './domItems'
import registerNewUser from './newUser'
import UserList from './userData'
import {greetingUser} from './createTheDom'

const {signInScreen, signUpScreen, splashScreen, registerUser, welcomeScreen , saveTripScreen, tripScreen, tripsListScreen, cancelTrip, getStarted, newUser, humbergerMenu, mobileMenu, saveTripBtn,  addTripBtnByClass, addTripBtnById, confirmPasswordInput, newPasswordInput, newNameInput } = domItems

const turnOffScreen = (elements) => {
    setTimeout(() => {
        elements.forEach((e) => {
            e.style.display = 'none'
        })
    },500)
}

export default function mobileUIController () {

        
        if(tripScreen.style.display === 'grid') {
            tripsListScreen.style.display = 'none'
            
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
            
            
            const users = new UserList()
           
            const storeUser = users.storeUser.bind(users)
            const isItRegistered = registerNewUser(name, password, confirmedPassword,storeUser)
    
            if(isItRegistered) {
                welcomeScreen.style.display = 'flex'
            
            setTimeout(() => {
                signUpScreen.classList.add('move-right')
            },100)
        
            setTimeout(() => {
                welcomeScreen.classList.add('fade-out')
                
                
            },3000)
        
            setTimeout(() => {
                welcomeScreen.style.display = 'none'
            },3500)
            turnOffScreen([signUpScreen, splashScreen])
            }

            greetingUser()

            
        })
        
        /*** */
        saveTripScreen.addEventListener('click', (e) => {
        
            if(e.target === saveTripBtn) {
        
                tripScreen.style.display = 'grid'
                tripsListScreen.style.display = 'none'
                setTimeout(() => {
                    saveTripScreen.classList.add('move-right') 
                }, 500)
            }
        
            if(e.target === cancelTrip) {
        
                if(tripsListScreen.style.display !== 'grid') {
                    tripsListScreen.style.display = 'grid'
                }
                
                if(tripScreen.style.display === 'none') {
                    tripsListScreen.style.display = 'none'
                    tripScreen.style.display = 'grid'

                }
                setTimeout(() => {
                    saveTripScreen.classList.add('move-right') 
                }, 500)
                
            }
        })
        
        /** */
        
        
        /** */
        tripsListScreen.addEventListener('click', (e) => {
        
            if(e.target.closest(`.${addTripBtnByClass.className}`)){
                tripScreen.style.display = 'none'
                saveTripScreen.classList.remove('move-right')
                tripsListScreen.style.display = 'none'
                // tripsListScreen.classList.add('move-left')
            }
        })
        
        /** */
        tripScreen.addEventListener('click', (e) => {
        
            if(e.target.closest(`#${addTripBtnById.id}`)){
                saveTripScreen.classList.remove('move-right')
                tripScreen.style.display = 'none'
            }
        })
        
    
}