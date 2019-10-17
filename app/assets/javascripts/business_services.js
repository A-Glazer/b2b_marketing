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
        url: `${BASE_URL}/business_services/`,
        method: 'get',
        dataType: 'json',
        success: function(data) {
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
        let newServiceForm = BusinessService.newServiceForm()
        document.querySelector('div#business-service-form').innerHTML = newServiceForm
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

function createBusinessService() {
    const business_service = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value 
       
    }
    fetch(`${BASE_URL}/business_services`, { 
        method: 'POST',
        body: JSON.stringify({ business_service }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        } 
    })
    .then(resp => resp.json())
    .then(data => {
        getServices()
    })
}
