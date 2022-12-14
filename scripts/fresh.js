/* __________________form section _______________ */
const fruitsSelectionContainer = document.querySelector('.fruits')
const URL = `https://brotherblazzard.github.io/canvas-content/fruit.json`
let cart = []
const mainContainer = document.querySelector('.mainform')
const fruitCartContainer = document.createElement('div')
fruitCartContainer.setAttribute('class', 'fruitCartContainer')
const tableNutritionFacts = document.createElement('table')

getData(URL)
async function getData(url){
    const res = await fetch(url)
    const data = await(res.json())
    displaySelectMenu(data)
}
function displaySelectMenu(data) {
    data.forEach(fruit => {
        let optionHTML =  `<option value="${fruit.name}">${fruit.name}</option>`
        fruitsSelectionContainer.innerHTML += optionHTML;
    });
    displayFruitsSelected(data)
}


function displayFruitsSelected(data) {
    fruitsSelectionContainer.addEventListener('input', e => {
        e.preventDefault()
        cart.push(e.target.value)
        
        while(fruitCartContainer.firstChild){
            fruitCartContainer.removeChild(fruitCartContainer.firstChild)
        }
        
        tableNutritionFacts.innerHTML = `
            <tbody class='bodyFruitsTable'>
                <tr class=rowHeaders>
                    <th>Delete</th>
                    <th>Fruit</th>
                    <th>Fat</th>
                    <th>Carbs</th>
                    <th>Protein</th>
                    <th>Sugar</th>
                    <th>Calories</th>
                <tr>
            </tbody>
        `
        fruitCartContainer.appendChild(tableNutritionFacts)
        mainContainer.appendChild(fruitCartContainer)
        // extract the object 'fruit' from the main array
        const fruitsSelected = data.filter((el) => {
            return cart.some((selected) => {
                return selected === el.name
            });
        });
        fruitsSelected.forEach(fruit => {
            const { calories, carbohydrates, fat, protein, sugar} = fruit.nutritions
            const { name } = fruit
            let tableBody = document.querySelector('.bodyFruitsTable')
            tableBody.innerHTML += `
                <tr class='rows'>
                    <td><button class='deleteFruit' id='${name}'>x</button></td>
                    <th>${name}</th>
                    <td class='fat'>${fat}</td>
                    <td>${carbohydrates}</td>
                    <td>${protein}</td>
                    <td>${sugar}</td>
                    <td>${calories}</td>
                </tr>
            `
            addTotal(fruitsSelected)
        })
    })
}


const totals = document.createElement('tr')
totals.setAttribute('class', 'totalTable')
function addTotal(fruitsSelected) {
    let totalFat = fruitsSelected.reduce((total, fruit) => total + fruit.nutritions.fat, 0);

    let totalCarbs = fruitsSelected.reduce((total, fruit) => total + fruit.nutritions.carbohydrates, 0);

    let totalProteins = fruitsSelected.reduce((total, fruit) => total + fruit.nutritions.protein, 0);

    let totalSugars = fruitsSelected.reduce((total, fruit) => total + fruit.nutritions.sugar, 0);

    let totalCalories = fruitsSelected.reduce((total, fruit) => total + fruit.nutritions.calories, 0);

    totals.innerHTML = ''

    totals.innerHTML = `
            <td></td>
            <th>Total</th>
            <td>${totalFat.toFixed()}</td>
            <td>${totalCarbs.toFixed()}</td>
            <td>${totalProteins.toFixed()}</td>
            <td>${totalSugars.toFixed()}</td>
            <td>${totalCalories.toFixed()}</td>
    `
    tableNutritionFacts.appendChild(totals)

    deleteFruitsButton()
}


function deleteFruitsButton() {
    let deleteButtons = document.querySelectorAll('.deleteFruit')
    deleteButtons.forEach( button => {
        button.addEventListener('click', e => {
            e.preventDefault()
            let fruitToDelete = button.getAttribute('id')
            cart.shift(fruitToDelete)

            let row = button.parentElement.parentElement
            row.remove()
            let rowTotal = document.querySelector('.totalTable')

            let headers = document.querySelector('.rowHeaders')
            let rowsArray = [...document.querySelectorAll('.rows')]
            if(rowsArray < 1) {
                headers.remove()
                rowTotal.remove()
            }
            
        })
    })
}

const buttonForm = document.querySelector('.formButton')
/* buttonForm.addEventListener('click', createUser) */
const form = document.querySelector('form')
form.addEventListener('submit', createUser)

function createUser(e) {
    e.preventDefault()
    const user = {
        userName: document.querySelector('#fname').value,
        userEmail: document.querySelector('#email').value,
        userPhone: document.querySelector('#phone').value,
        userTextArea: document.querySelector('#comments').value
    }

    showUserInfo(user)
}

const today = new Date()
const formDate = document.querySelector('#formDate');
formDate.value = today.toLocaleString()

function showUserInfo(user) {
    const { userName, userEmail, userPhone, userTextArea} = user
    const userInfoContainer = document.createElement('div')
    userInfoContainer.setAttribute('class', 'orderInformation')

    userInfoContainer.innerHTML = `
        <h2>Thank you for your purchase!</h2>
        <h3>Order Information</h3>
        <p><em>Name: </em> ${userName}</p>
        <p><em>E-mail: </em> ${userEmail}</p>
        <p><em>Phone: </em> ${userPhone}</p>
    `
    if(userTextArea != '') {
        const indicationsP = document.createElement('p')
        indicationsP.innerHTML =`
            <p><em>Indications: </em>${userTextArea}</p>
        `
        userInfoContainer.appendChild(indicationsP)
    }


    fruitCartContainer.remove()
    form.remove()
    mainContainer.append(userInfoContainer)

    const fruitSelectedTitle = document.createElement('h3')
    fruitSelectedTitle.textContent = `
        Fruits Selected
    `
    userInfoContainer.appendChild(fruitSelectedTitle)
    cart.forEach(fruit => {
        const Pfruits = document.createElement('p')
        Pfruits.innerHTML = `
                ${fruit}
        `
        userInfoContainer.appendChild(Pfruits)
    })  
    const pDate = document.createElement('p')
    pDate.textContent = formDate.value
    pDate.style.fontSize = '1rem'
    userInfoContainer.appendChild(pDate)

        /* =======build object with order information========= */
    let orders = []
    let order = {
        name: userName,
        date: formDate.value,
        fruits:  cart
    }
    orders.push(order)
    let ordersStorage = JSON.parse(localStorage.getItem('drinks'))

    if(!ordersStorage) {
        localStorage.setItem('drinks', JSON.stringify(orders))
    } else {
        ordersStorage.push(order)
        localStorage.setItem('drinks', JSON.stringify(ordersStorage))
    }
    createButtonBuyAgain()
}

function createButtonBuyAgain() {
    const btnContainer = document.createElement('div')
    btnContainer.setAttribute('class', 'btnBuyAgainContainer')
    const btn = document.createElement('a')
    btn.classList.add('btnOrderAgain')
    btn.setAttribute('href', 'fresh.html')
    btn.textContent = 'Order More Fruits'
    btnContainer.appendChild(btn)
    mainContainer.append(btnContainer)
}
