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