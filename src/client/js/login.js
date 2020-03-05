import domItems from './domItems'
import UserList from './userData'
const {loginBtn, nameInput, passwordInput, signInScreen, splashScreen, tripScreen, tripsListScreen, saveTripScreen} = domItems

// const login = (info) => {
//     return info.length !== 0? true : false
// }

export default function login(users, userName, userPassword){

    if(userName && userPassword) {

        if(
            users.isItUser({
                name: userName,
                password: userPassword
            })
        ) {
            
            setTimeout(() => {
                signInScreen.classList.add('move-right')
                splashScreen.classList.add('move-right')
            },100)

            tripsListScreen.style.display = 'grid'
            tripScreen.style.display = 'grid'
            saveTripScreen.style.display = 'flex'
            saveTripScreen.classList.add('move-right')


            nameInput.value = ''
            passwordInput.value = ''

        } else {
            alert('wrong user name or password, or user does not exist')
        }

    }else {
        alert('please fill all the fields!')
    }
}