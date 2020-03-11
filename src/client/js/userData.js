export default class UsersList {
    
    constructor(){
        this.users = []
    }

    createUSer(name, password) {
        return [name, password]
    }

    storeUser(user) {
        this.users.push(user)
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    isItUser(user) {

        const storedUsers = JSON.parse(localStorage.getItem('users'))

      const test = storedUsers.filter(u => (u[0].toLowerCase() === user.name.toLowerCase() && u[1] === user.password) ) 
      if(test.length > 0)
      {
          return true
      }
      else {
          return false
      }
    }

    getUserName() {
        return JSON.parse(localStorage.getItem('users'))[0][0]
    }


}