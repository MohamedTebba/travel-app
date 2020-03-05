import domItems from "./domItems"

const {humbergerMenu, mobileMenu} = domItems

export default humbergerMenu.addEventListener( 'click', () => {
    humbergerMenu.classList.toggle('toggle-burger')
    mobileMenu.classList.toggle('toggle-mobile-menu')

})
