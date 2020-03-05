
export default function registerNewUser (name, password, confirmedPassword, storeUser) {

    if(name && (password === confirmedPassword) && password) {
        
        storeUser([name, password])
        // configStyles()
        return true

    }else if(!name){
        alert('enter a valid name')
        return false
    }else{
        alert('passwords do not match')
        return false
    }
}