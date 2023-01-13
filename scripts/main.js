responsiveMenu()
function responsiveMenu(){
    const icon = document.querySelector('.icon');
    const smallHead = document.querySelector('.smallHead')
    const smallMenu = document.querySelector('.smallMenu')
    const socialMediaIconsContainer = document.querySelector('.socialMediaContainerIcons')
    const logoContainer = document.querySelector('.logoContainer')
    icon.addEventListener('click', () => {
        smallHead.classList.toggle('displayNone')
        smallMenu.classList.toggle('displayNone')
        socialMediaIconsContainer.classList.toggle('displayNone')
        logoContainer.classList.toggle('displayNone')
    })
}
/* ================set days for forecast weather====================== */


const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const date = new Date();
let numberDay = date.getDay()
const day = dayNames[numberDay]
let numberMonth = date.getDay()
const month = monthNames[numberMonth]
const year = date.getFullYear();
const DayNumber = date.getDate()
const dateHeader = document.getElementById('dateHeader');
/* ===============footer last modified============== */
const currentDate = document.getElementById('currentDate');
currentDate.innerHTML = `Last updated: ${document.lastModified}`
