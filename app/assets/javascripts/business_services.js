// ** NEED TO FIGURE OUT WHY POTENTIAL CLIENTS NEW FORM ISN"T SAVING AND ADDING TO POTENTIAL CLIENT LIST**


{/* <script src="jquery.min.js"></script>  */}

{/* <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script> */}

{/* <script type="text/javascript" src="js/script.js"></script> */}


// $(document).ready(function () {
// (function($){
//    console.log('business_service.js is loaded...') 
//    listenForClick()
//    listenForNewServiceForm()
// })(jQuery);

const BASE_URL = 'http://localhost:3000'

function listenForClick() {
    $('button#info-data').on('click', function(event) {
        event.preventDefault()
        getServices()
    })
}

function getServices() {
    document.querySelector('div#business-service-form').innerHTML = ""
    $.ajax({
        url: 'http://localhost:3000/business_services',
        method: 'get',
        dataType: 'json',
        success: function(data) {
            console.log("the data is: ", data)
            document.getElementById('info').innerHTML = ""
            data.map(business_service => {
              
                const newService = new BusinessService(business_service)
                const newServiceHtml = newService.newServiceHtml()
           
                document.getElementById('info').innerHTML += newServiceHtml
                showServiceOnClick()
            })
        }
    })
}

function listenForNewServiceForm() {
    // $('button#business-service-form').on('click', function (event)  {
        // event.preventDefault()
        let newServiceForm = BusinessService.newServiceForm()
        document.querySelector('div#business-service-form').innerHTML = newServiceForm
        
    // })
}

class BusinessService {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.description = obj.description
    }

    static newServiceForm() {
        return (`
        <br>
        <strong>New Business Service Form</strong>
        <br>
            <form onsubmit="createBusinessService(); return false;">
            <label>Name: </label>
            <input type="text" id="name"></input>
            <br>
            <label>Description: </label>
            <input type="text" id="description"></input>
            <br>
            <input type="submit" value="Submit"></input>
            </form>
        `)
    }
}

BusinessService.prototype.newServiceHtml = function () {
    return (`
    <div>
    <ul>
        <li><a href="#" data-id="${this.id}">${this.name}</a> - ${this.description}</li>
    </ul>
    </div>
    `)
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

// working 
function createBusinessService() {
    // debugger
    const business_service = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value 
       
    }
    fetch('http://localhost:3000/business_services', { 
        method: 'POST',
        // body: JSON.parse(businessService),
        body: JSON.stringify({ business_service }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        } 
    })
    // .then(resp => resp.text())
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        getServices()
    // .then(text => {
        // console.log(text)
    })
}

// function createBusinessService() {
//     $.ajax({
//         url: 'http://localhost:3000/business_services',
//         method: 'POST',
//         dataType: 'json',
//         success: function(data) {
//             console.log("the data is: ", data)
//             getServices()
           
//         }
//     })
// }

// potential clients button
// potential clients is displaying business_services instead of clients
function getClients() {
    // document.querySelector('div#potential-clients-form').innerHTML = ""
    // let service_list = document.querySelectorAll('li a')
    // for (let i = 0; i < service_list.length; i++) {
    //     let serviceId = service_list[i].dataset.id
    // idNum = (service_list.length -1)

    // const businessServiceIdURL = (`http://localhost:3000//business_services/${idNum}/potential_clients`)
    
    $.ajax({
        // url is wrong
        // url: `http://localhost:3000//business_services/${business_service.id}/potential_clients`,
        // url: (BASE_URL + `/business_services/${businessServiceId}`),
        url: (BASE_URL + `/business_services`),
        method: 'get',
        dataType: 'json',
        success: function(data) {
            
            console.log("the data is: ", data[1].potential_clients)
            // document.getElementById('client-info').innerHTML = ""
            // I want it to display: data[business_service id#].potential_clients. I can't figure out how to find the id
            const businessServiceId = document.querySelector('div#about_business_service p').innerHTML
            data[`${businessServiceId}`].potential_clients.map(potential_client => {
            //   debugger
                const newClient = new PotentialClient(potential_client)
                const newClientHtml = newClient.newClientHtml()
           
                document.getElementById('client-info').innerHTML += newClientHtml
            })
        }
    })
}


class PotentialClient {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.last_contacted = obj.last_contacted
        this.reply = obj.reply
        this.follow_up = obj.follow_up
        this.agreed_to_meeting = obj.agreed_to_meeting
        // this.business_service_id = obj.business_service_id
    }

    static newClientForm() {
        return (`
        <br>
        <strong>New Potential Client Form</strong>
        <br>
            <form onsubmit="createPotentialClient();">
            <label>Name: </label>
            <input type="text" id="name"></input>
            <br>
            <label>Last Contacted: </label>
            <input type="text" id="last_contacted"></input>
            <br>
            <label>Reply: </label>
            <input type="text" id="reply"></input>
            <br>
            <label>Follow_up: </label>
            <input type="text" id="follow_up"></input>
            <br>
            <label>Agreed to Meeting?: </label>
            <input type="text" id="agreed_to_meeting"></input>
            <br>
            
            <br>

            <input type="submit" value="Submit"></input>
            </form>
        `)
    }
}

PotentialClient.prototype.newClientHtml = function () {
    return (`
    <div id='client-details'>
        <h4>Name: ${this.name}</h4> 
        <p>Last Contacted: ${this.last_contacted}</p>
        <p>Reply: ${this.reply}</p> 
        <p>Follow up: ${this.follow_up}</p>
        <p>Agreed to Meeting? ${this.agreed_to_meeting}</p> 
    </div>
    `)
}

function listenForNewClientForm() {
        let newClientForm = PotentialClient.newClientForm()
        document.querySelector('div#potential-client-form').innerHTML = newClientForm
        
    // })
}

function createPotentialClient() {
    // debugger
    const potential_client = {
        name: document.getElementById('name').value,
        last_contacted: document.getElementById('last_contacted').value, 
        reply: document.getElementById('reply').value,
        follow_up: document.getElementById('follow_up').value,
        agreed_to_meeting: document.getElementById('agreed_to_meeting').value,
        business_service_id: document.querySelector('div#about_business_service p').innerHTML
    }

    
    const businessServiceId = document.querySelector('div#about_business_service p').innerHTML
    debugger
    // $.ajax({
    //     url: (BASE_URL + `/business_services/${businessServiceId}`),
    //     method: 'POST',
    //     dataType: 'json',
    //     success: function(data) {
           
    //         console.log(data)
    //     }
    // })
    
    // fetch(BASE_URL + `/business_services/${businessServiceId}`), { 
    fetch((`http://localhost:3000/business_services/${businessServiceId}`), { 
        method: 'POST',
        // body: JSON.stringify({ potential_client }),
        body: potential_client,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')

        }

    }).then(resp => resp.json())
    .then(data => {
        console.log(data)
        debugger
        getClients()
    })
}
    // function listenForClientClick() {
    //     $('button#info-data').on('click', function(event) {
    //         event.preventDefault()
    //         getServices()
    //     })
    // }







// in middle of
// function showClientOnClick() {
    // let clientListLocation = document.querySelector('div#potential-client-list ul li')
    // for (let i = 0; i < urlTitle.length; i++) {
    //     let titleId = urlTitle[i].dataset.id
    //     const businessServiceShowURL = (`${BASE_URL}/business_services/${titleId}`)
        
    // urlTitle[i].addEventListener('click', function(){
        // window.location.href = businessServiceShowURL
    // })
    // }
// }


// function createBusinessService() {
//     // const businessService = {
//     //     name: document.getElementById('name').value,
//     //     description: document.getElementById('description').value 
//     // }

//     $('div#business-service-form').on("submit", function(event) {
//             $.ajax({
//                 url: 'http://localhost:3000/business_services',
//                 type: 'POST',
//                 data: $(this).serialize(),
//                 success: function(response) {
//                     $(document.getElementById('info')).innerHTML 
//                     let businessService = new BusinessService(response)
//                     businessService.newServiceHtml()
                    
//                 }
//             })
//             event.preventDefault()
//         })
// }
// })


/*
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
*/