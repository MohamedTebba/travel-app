const domStrings = {
    getStartedBtn :'.splash-screen__button',
    spalshScreen :'.splash-screen',
    signInScreen : '.sign-in',
    newUserBtn : '.new-user',
    signUpScreen : '.sign-up',
    register: '#reg-btn',
    welcomeScreen: '.welcome-screen',
    saveTrip : '.save-trip',
    saveTripBtn : '#save-trip-btn',
    cancelTrip: '.cancel-trip',
    tripScreen: '.trip',
    tripsListScreen: '.trips-list',
    humberger: '.humberger-toggle',
    mobileMenu: '.trip__menu',
    addTripBtn: 'add-trip',
    sections: 'section',
    nameInput: '#sign-in-name',
    psswInput: '#sign-in-pssw',
    login: '#login-btn',
    newNameInput: '#sign-up-name',
    newPassInput: '#sign-up-pssw',
    confPassInput: '#confirm-pssw',
    userNameHeader: '.welcome-screen__greetings'
}


const domItems = {
    getStarted: document.querySelector(domStrings.getStartedBtn),
    splashScreen: document.querySelector(domStrings.spalshScreen),
    signInScreen: document.querySelector(domStrings.signInScreen),
    newUser: document.querySelector(domStrings.newUserBtn),
    signUpScreen: document.querySelector(domStrings.signUpScreen),
    registerUser: document.querySelector(domStrings.register),
    welcomeScreen: document.querySelector(domStrings.welcomeScreen),
    saveTripScreen: document.querySelector(domStrings.saveTrip),
    saveTripBtn: document.querySelector(domStrings.saveTripBtn),
    cancelTrip: document.querySelector(domStrings.cancelTrip),
    tripScreen: document.querySelector(domStrings.tripScreen),
    tripsListScreen: document.querySelector(domStrings.tripsListScreen),
    humbergerMenu: document.querySelector(domStrings.humberger),
    mobileMenu: document.querySelector(domStrings.mobileMenu),
    addTripBtnByClass: document.querySelector(`.${domStrings.addTripBtn}`),
    addTripBtnById: document.getElementById(domStrings.addTripBtn),
    allSections: document.querySelectorAll(domStrings.sections),
    nameInput: document.querySelector(domStrings.nameInput),
    passwordInput: document.querySelector(domStrings.psswInput),
    loginBtn: document.querySelector(domStrings.login),
    newNameInput: document.querySelector(domStrings.newNameInput),
    newPasswordInput: document.querySelector(domStrings.newPassInput),
    confirmPasswordInput: document.querySelector(domStrings.confPassInput),
    userNameHeader: document.querySelector(domStrings.userNameHeader)

}

export default domItems