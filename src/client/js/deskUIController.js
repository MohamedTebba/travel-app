import domItems from './domItems'
import UserList from './userData'
import registerNewUser from './newUser'
import {greetingUser} from './createTheDom'

const {signInScreen, signUpScreen, splashScreen, registerUser, welcomeScreen , saveTripScreen, tripScreen, tripsListScreen, addTripBtnByClass, newNameInput, newPasswordInput, confirmPasswordInput } = domItems

const turnOffScreen = (elements) => {
    setTimeout(() => {
        elements.forEach((e) => {
            e.style.display = 'none'
        })
    },500)
}

export default function deskUIController () {

        /** */
        if(tripScreen.style.display === 'grid') {
            tripsListScreen.style.display = 'grid'
            
        }
        
        if(tripsListScreen.style.display === 'grid') {
            tripScreen.style.display = 'grid'
        }

        domItems.newUser.addEventListener('click', () => {
            signUpScreen.style.display = 'flex'
            signInScreen.classList.add('move-right')
            splashScreen.classList.add('move-right')

            turnOffScreen([signInScreen, splashScreen])
            // domItems.signUpScreen.style.zIndex = '19'
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
    
                saveTripScreen.style.display = 'flex'
            
                setTimeout(() => {
                    welcomeScreen.style.display = 'none'
                },3500)
                
                // turnOffScreen([domItems])
            }

            greetingUser()
        
            
        })

        /*** */
        saveTripScreen.addEventListener('click', (e) => {
        
            if(e.target === domItems.saveTripBtn) {
        
                tripsListScreen.style.display = 'grid'
                tripScreen.style.display = 'grid'
                setTimeout(() => {
                    saveTripScreen.classList.add('move-right') 
                }, 500)
            }
        
            if(e.target === domItems.cancelTrip) {
        
                tripsListScreen.style.display = 'grid'
                tripScreen.style.display = 'grid'
                setTimeout(() => {
                    saveTripScreen.classList.add('move-right') 
                }, 500)
                
            }
        })

        /** */
        tripsListScreen.addEventListener('click', (e) => {
        
            if(e.target.closest(`.${addTripBtnByClass.className}`)){
                tripScreen.style.display = 'none'
                saveTripScreen.classList.remove('move-right')
                tripsListScreen.style.display = 'none'
                // tripsListScreen.classList.add('move-left')
            }
        })

}