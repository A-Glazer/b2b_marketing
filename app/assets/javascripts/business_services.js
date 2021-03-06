const BASE_URL = 'http://localhost:3000'

function listenForClick() {
    $('button#info-data').on('click', function(event) {
        event.preventDefault()
        getServices()
    })
}

function getSortedServices() {
    document.querySelector('div#business-service-form').innerHTML = ""
    $.ajax({
        url: `${BASE_URL}/business_services/`,
        method: 'get',
        dataType: 'json',
        success: function(data) {
            document.getElementById('info').innerHTML = ""
            sortedArray = []

            data.sort(function(a, b) {
                let nameA = a.name 
                let nameB = b.name
                if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                
                  // names must be equal
                  return 0;
            })
            console.log(data)            
            data.map(business_service => {
                const newService = new BusinessService(business_service)
                const newServiceHtml = newService.newServiceHtml()
                
                document.querySelector('div#sort-service').innerHTML += newServiceHtml
                showServiceOnClick()
            })
        }
    })
}

function getServices() {
    console.log("we reached getServices")
    document.querySelector('div#business-service-form').innerHTML = ""
    // document.querySelector("#showInfo") = ""
    $.ajax({
        url: `${BASE_URL}/business_services/`,
        method: 'get',
        dataType: 'json',
        success: function(data) {
            document.getElementById('info').innerHTML = ""
            data.map(business_service => {
                console.log("business_service in getServices", business_service)
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
        document.querySelector("#showInfo").innerHTML = ""
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
        <br/><br/>
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
    <div id="services">
    <ul>
    <li><a href="#" data-id="${this.id}">${this.name}</a> - ${this.description}</li>
    </ul>
    `)
}

function showServiceOnClick() {
    console.log("showServiceOnClick is hit")
    // document.querySelector("#showInfo") = ""
    // debugger
    let urlTitle = document.querySelectorAll('li a')
    for (let i = 0; i < urlTitle.length; i++) {   
        urlTitle[i].addEventListener('click', showServices)  
    }
}

// rendering show page info on index page 
function showServices(e) {
    console.log("showServices is hit")
    // debugger
    e.preventDefault()
    let id = this.dataset.id
    // let location = document.querySelector("#showInfo")
    let location = document.querySelector("#showInfo")
    location.innerHTML = ''

    fetch(BASE_URL + '/business_services/' + id + '.json')
        .then(resp => resp.json())
        .then(data => {
            location.innerHTML += `<h5>Potential Clients for ${data.name}:</h5>`;
            for (let i = 0; i < data.potential_clients.length; i++) {
                if (data.potential_clients[i].name !== null) {
                location.innerHTML += `<div class="card mx-auto" style="width: 18rem;"><div class="card-body">
                <h5 class="card-title">${data.potential_clients[i].name}</h5>`
            }
            
        }
        location.innerHTML += `<button class="loadShow">View Page</button>`    
        
        $(".loadShow").on("click", function() {
            console.log("url in showServices", data)
            const businessServiceShowURL = (`${BASE_URL}/business_services/${data.id}`)
            window.location.href = businessServiceShowURL 
        });
        }) 
}

function newShowServices(data) {
    document.querySelector('div#business-service-form').innerHTML = ""
    $.ajax({
        url: `${BASE_URL}/business_services/`,
        method: 'get',
        dataType: 'json',
        success: function(data) {
            let renderLocation = document.querySelector("#showInfo")
            renderLocation.innerHTML = ""
            data.map(business_service => {
                console.log("business_service in getServices", business_service)
                const newService = new BusinessService(business_service)
                const newServiceHtml = newService.newServiceHtml()
           
                renderLocation.innerHTML += newServiceHtml
                renderLocation.innerHTML += `<h5>Potential Clients for ${data.name}:</h5>`;
                renderLocation.innerHTML += `<button class="loadShow">View Page</button>`    
   
        $(".loadShow").on("click", function() {
            const businessServiceShowURL = (`${BASE_URL}/business_services/${data.id}`)
            window.location.href = businessServiceShowURL 
        });
                showServiceOnClick()
            })
        }
    })
}

function createBusinessService() {
    const business_service = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value 
       
    }
    // document.querySelector("#showInfo").innerHTML= ""
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
        console.log("data1", data)
        getServices()
        // newShowServices(data)
    })
}


// next button original
$(function () {
    $(".js-next").on("click", function(event) {
        const parts = window.location.href.split("/");
        const id = parts[parts.length - 1]; 
        const nextId = parseInt(id) + 1
        console.log(nextId)
        // let nextId = parseInt($(".js-next").attr("data-id")) + 1;
        $.get("/business_services/" + nextId + ".json", function(data) {
                showPC(data)
                console.log("data in next button", data)
            //         // re-set the id to current on the link
            $(".js-next").attr("data-id", data["id"]);
            window.history.pushState(null, null, `${BASE_URL}/business_services/${nextId}`);
        })

        event.preventDefault()
    });

    $(".js-back").on("click", function(event) {
        const parts = window.location.href.split("/");
        const id = parts[parts.length - 1]; 
        const backId = id - 1
        if (backId === 0){
            alert("You have reached the first business service.")
        }
        console.log(backId)
        // let backId = parseInt($(".js-back").attr("data-id")) - 1;
        $.get("/business_services/" + backId + ".json", function(data) {
           showPC(data)
            
    //         // re-set the id to current on the link
            $(".js-back").attr("data-id", data["id"]);
            window.history.pushState(null, null, `${BASE_URL}/business_services/${backId}`);
        });
        event.preventDefault()
    });
})
    
function showPC(data) {
    console.log("data in showPC", data)
    let location =  document.querySelector(".potential-client-list")  

    location.innerHTML = ""
    location.innerHTML += `<div class="shadow p-3 mb-5 bg-white rounded"><h2>More information about: ${data.name}</h2><br/><h4>Description: ${data.description}</h4></div>`;
        location.innerHTML += `<h2>Potential Clients:</h2>`
        for (let i = 0; i < data.potential_clients.length; i++) {
            // debugger
            if (data.potential_clients[i].name !== null) {
                location.innerHTML += `<div class="card mx-auto" style="width: 18rem;"><div class="card-body">
                <h5 class="card-title">${data.potential_clients[i].name}</h5>
                <p class="card-text text-left">Last Contacted: ${data.potential_clients[i].last_contacted}<br/>
                Reply: ${data.potential_clients[i].reply}<br/>
                Follow Up: ${data.potential_clients[i].follow_up}<br/>
                Agreed to Meeting? ${data.potential_clients[i].agreed_to_meeting}</p>
                </div></div>`
           }
        }
}


// loads show page content on load
window.onload = function() {
    const parts = window.location.href.split("/");
    const id = parts[parts.length - 1]; 
    $.get("/business_services/" + id + ".json", function(data) {
        console.log("data once page changes", data)
        // debugger
        showPC(data)
         
         // re-set the id to current on the link
         $(".js-next").attr("data-id", data["id"]);
         console.log("data after next button", data)
        //  debugger

    })
  };












