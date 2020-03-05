import domItems from "./domItems";
import UserList from './userData'

const users = new UserList()
const {userNameHeader} = domItems

export function greetingUser(){
const userName = users.getUserName()
// console.log(userName)
userNameHeader.innerHTML = `hi ${userName},`
}