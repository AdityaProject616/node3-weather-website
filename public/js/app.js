console.log("Client side JavaScript File is Loaded")
//fetch is client side Javascript so we are not using as we r working with server side js

const weatherForm = document.querySelector('form')                            //name selection same like css
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {    //e is event
    event.preventDefault()                       //to prevent page from refreshing

    messageOne.textContent = "Loading..."
    messageTwo.textContent =""

    const location = search.value
    console.log(location)
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast 
                
            }
        })

    })
})