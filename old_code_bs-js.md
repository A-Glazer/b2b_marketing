Business Service.js old code

const BASE_URL = 'http://localhost:3000'

function getService() {
    // if there is a form on this page, I want to clear it
    // let id = this.dataset.id
    
    let info = document.getElementById('info')
    info.innerHTML = '<ol>'
    fetch(BASE_URL + '/business_services.json')
    .then(resp => resp.json())
    .then(business_services => {
        info.innerHTML += business_services.map(business_service => `<li><a href="#" data-id="${business_service.id}">${business_service.name}</a> - ${business_service.description}</li>`).join('')
        info.innerHTML += '</ul>'
        
        showServiceOnClick()
        // create eventListener on a click to see more button
        // looking at getTodos()
    }) 
}
    
function showServiceOnClick() {
    let urlTitle = document.querySelectorAll('li a')
    for (let i = 0; i < urlTitle.length; i++) {
        let titleId = urlTitle[i].dataset.id
        const businessServiceShowURL = (`${BASE_URL}/business_services/${titleId}`)
        
    urlTitle[i].addEventListener('click', function(){
        window.location.href = businessServiceShowURL
    })
    }
}

function newService() {
    let businessServiceForm = document.getElementById('business-service-form')
    let html = `
        <form onsubmit="createBusinessService(); return false;">
            <label>Name: </label>
            <input type="text" id="name"></input>
            <br>
            <label>Description: </label>
            <input type="text" id="description"></input>
            <br>
            <input type="submit" value="Submit"></input>
        </form>
    `
    businessServiceForm.innerHTML = html
    
}

class BusinessService {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.description = obj.description
    }
    
    static newServiceForm() {
        return (`
        <strong>New Business Service Form</strong>
            <form>
                <input id="name" type="text" name="name></input>
                <input type="text" name="description"></input><br>
                <input type="submit">
        `)
    }
    
}

function createBusinessService() {
    const businessService = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value 
    }
    // console.log(businessService, "will we hit this?")
    // fetch request isnt working
    // http://localhost:3000/business_services
    fetch((BASE_URL + '/business_services'), { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')

        },
        body: JSON.stringify(businessService)

    }).then(resp => resp.json())
    .then(data => {
        // debugger
        // document.querySelector("#info ol").innerHTML += `<li><a href="#" data-id="${businessService.id}">${businessService.name}</a> - ${businessService.description}</li>`
        console.log(data)
    })
}



function getClient() {
    // if there is a form on this page, I want to clear it
    $(".")
    let id = this.dataset.id
    
    let info = document.getElementById('client-info')
    info.innerHTML = '<ol>'
    fetch(BASE_URL + '/business_services/' + `${id}` + '.json')
    .then(resp => resp.json())
    .then(data => {
        client-info.innerHTML('') 
        let newList = client-info.innerHTML(`<ul class= "text-primary"></ul>`) 
        data =>{
            let newClientInfo = new ClientInfo(client)
        }
        
     
        
        // showClientOnClick()
        
    }) 
}

function ClientInfo(client){
    this.id = client.id
    this.name = client.name
    this.last_contacted = client.last_contacted
    this.reply = client.reply
    this.follow_up = client.follow_up
    this.agreed_to_meeting = client.agreed_to_meeting
}
    
// function showClientOnClick() {
//     let urlTitle = document.querySelectorAll('li a')
//     for (let i = 0; i < urlTitle.length; i++) {
//         let titleId = urlTitle[i].dataset.id
//         const businessServiceShowURL = (`${BASE_URL}/business_services/${titleId}`)
        
//     urlTitle[i].addEventListener('click', function(){
//         window.location.href = businessServiceShowURL
//     })
//     }
// }
