export class User {

    constructor(name, password) {
        this.name = name
        this.password = password
        this.logged = true
    }

    storeUser(user) {
        // this.users.push(user)
        localStorage.setItem('user', JSON.stringify(user))
    }

    isItUser(user) {
        const storedUser = JSON.parse(localStorage.getItem('user'))
      storedUser.name.toLowerCase() === user.name.toLowerCase() && storedUser.password === user.password ? true :false
      
    }

    getUserName() {
        return JSON.parse(localStorage.getItem('user')).name
    }

    loggedIn(logged){
        this.logged = logged
        return this.logged
    }


}

export function toggleLog(value) {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    localStorage.setItem('user', JSON.stringify({...storedUser,logged:value}))


}