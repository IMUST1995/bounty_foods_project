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

/*----------show localstorage items amount----------------- */
/* cardOrders. */
displayOrdersCard()
function displayOrdersCard() {
    let orderStorage = JSON.parse(localStorage.getItem('drinks'))
    const main = document.querySelector('#mainHome')
    if(orderStorage){
        const ordersContainer = document.createElement('div')
        main.appendChild(ordersContainer)
        ordersContainer.classList.add('ordersContainer')
        ordersContainer.innerHTML = `
            <h2>Here your orders</h2>
        `
        orderStorage.forEach(order => {
            const {name, date, fruits} = order
            let infoOrder = document.createElement('div')
            infoOrder.classList.add('infoOrder')
            infoOrder.innerHTML = `
                <h4 class='nameOrder'>Name: ${name}</h4>
                <p>${date}</p>
                <p>${fruits} Mix</p>
            `
            ordersContainer.appendChild(infoOrder)
    });
    } else {
        const discountContainer = document.createElement('div')
        main.appendChild(discountContainer)
        discountContainer.classList.add('ordersContainer')
        discountContainer.innerHTML = `
            <h2>20% off in the first Order!</h2>
        `
    }
}
