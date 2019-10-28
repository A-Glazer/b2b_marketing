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
    <div id="services">
    <ul>
    <li><a href="#" data-id="${this.id}">${this.name}</a> - ${this.description}</li>
    </ul>
    `)
}

{/* <li><a href="${BASE_URL}/business_services/${this.id}.json" data-id="${this.id}">${this.name}</a> - ${this.description}</li> */}


// function showServiceOnClick() {
//     let urlTitle = document.querySelectorAll('li a')
//     for (let i = 0; i < urlTitle.length; i++) {
//         let titleId = urlTitle[i].dataset.id
//         const businessServiceShowURL = (`${BASE_URL}/business_services/${titleId}.json`)
//         urlTitle[i].addEventListener('click', function() {
//             debugger

//         })  
            // window.location.href = businessServiceShowURL
        
        // testing link
        // fetch(BASE_URL + '/business_services/' + titleId + '.json')
            // .then(resp => resp.json())
            // .then (data => {
                // alert("Did this work?")
            // })
        
//     }
// }

function showServiceOnClick() {
    let urlTitle = document.querySelectorAll('li a')
    // debugger
    for (let i = 0; i < urlTitle.length; i++) {
//         let titleId = urlTitle[i].dataset.id
        // const businessServiceShowURL = (`${BASE_URL}/business_services/${titleId}.json`)
    // debugger        
    urlTitle[i].addEventListener('click', showServices)  
//             debugger 
            // window.location.href = businessServiceShowURL       
//     })
    }
}

// rendering show page info on index page 
function showServices(e) {
    e.preventDefault()
    let id = this.dataset.id
    let location = document.querySelector("#showInfo")
    location.innerHTML = ''

    fetch(BASE_URL + '/business_services/' + id + '.json')
        .then(resp => resp.json())
        .then(data => {
            location.innerHTML += `<h2>More information about: ${data.name}</h2>`;
            location.innerHTML += `<h3><i>Description: ${data.description}</i></h3>`
            location.innerHTML += `<h2>Potential Clients:</h2>`
            for (let i = 0; i < data.potential_clients.length; i++) {
                if (data.potential_clients[i].name !== null) {
                location.innerHTML += `<h4>Name: ${data.potential_clients[i].name}</h4>`
                location.innerHTML += `<p>Last Contacted: ${data.potential_clients[i].last_contacted}</p>`
                location.innerHTML += `<p>Reply: ${data.potential_clients[i].reply}</p>`
                location.innerHTML += `<p>Follow Up: ${data.potential_clients[i].follow_up}</p>`
                location.innerHTML += `<p>Agreed to Meeting? ${data.potential_clients[i].agreed_to_meeting}</p>`
            }
            
        }
        location.innerHTML += `<button class="loadShow">View More</button>`    
        
        $(".loadShow").on("click", function() {
            const businessServiceShowURL = (`${BASE_URL}/business_services/${data.id}`)
            window.location.href = businessServiceShowURL 
        });
        }) 
}

// load show page
// $(function () {
// })

// trying to get the showServices to render the show page via json
// function showServices(e) {
//     e.preventDefault()
//     let id = this.dataset.id
//     // let location2 = document.querySelector("#showInfo")
//     // location2.innerHTML = ''

//     fetch(BASE_URL + '/business_services/' + id + '.json')
//     .then(resp => resp.json())
//     .then(data => {
//         window.location = (BASE_URL + '/business_services/' + data.id)
        
        
//         // location.innerHTML += `<h2>More information about: ${data.name}</h2>`;
//         // location.innerHTML += `<h3><i>Description: ${data.description}</i></h3>`
//         //     location.innerHTML += `<h2>Potential Clients:</h2>`
//         //     for (let i = 0; i < data.potential_clients.length; i++) {
//         //         if (data.potential_clients[i].name !== null) {
//         //         location.innerHTML += `<h4>Name: ${data.potential_clients[i].name}</h4>`
//         //         location.innerHTML += `<p>Last Contacted: ${data.potential_clients[i].last_contacted}</p>`
//         //         location.innerHTML += `<p>Reply: ${data.potential_clients[i].reply}</p>`
//         //         location.innerHTML += `<p>Follow Up: ${data.potential_clients[i].follow_up}</p>`
//         //         location.innerHTML += `<p>Agreed to Meeting? ${data.potential_clients[i].agreed_to_meeting}</p>`
//             // }
//         // }
//     }) 
// }
    

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


// next button original
$(function () {
    $(".js-next").on("click", function(event) {
        let nextId = parseInt($(".js-next").attr("data-id")) + 1;
        $.get("/business_services/" + nextId + ".json", function(data) {
           showPC(data)
            
    //         // re-set the id to current on the link
            $(".js-next").attr("data-id", data["id"]);
            window.history.pushState(null, null, `${BASE_URL}/business_services/${nextId}`);
        });
        event.preventDefault()
    });

    $(".js-back").on("click", function(event) {
        const parts = window.location.href.split("/");
        const id = parts[parts.length - 1]; 
        const backId = id - 1
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
    
    
  // back button not working - that data-id is reseting itself to the original number. It needs to be the number of the webpage
//     $(".js-back").on("click", function(event) {
//         event.preventDefault()
//         // window.history.back()
//         const parts = window.location.href.split("/");
//         const id = parts[parts.length - 1]; 
       
//         let backId = parseInt($(".js-back").attr("data-id"));
//         console.log(backId);
//         $.get("/business_services/" + backId + ".json", function(data) {
//         showPC(data)
//         })
//     })
// })


function showPC(data) {
    let location =  document.querySelector(".potential-client-list")
    location.innerHTML = ""
    location.innerHTML += `<h2>More information about: ${data.name}</h2>`;
    location.innerHTML += `<h3><i>Description: ${data.description}</i></h3>`
        location.innerHTML += `<h2>Potential Clients:</h2>`
        for (let i = 0; i < data.potential_clients.length; i++) {
            if (data.potential_clients[i].name !== null) {
            location.innerHTML += `<h4>Name: ${data.potential_clients[i].name}</h4>`
            location.innerHTML += `<p>Last Contacted: ${data.potential_clients[i].last_contacted}</p>`
            location.innerHTML += `<p>Reply: ${data.potential_clients[i].reply}</p>`
            location.innerHTML += `<p>Follow Up: ${data.potential_clients[i].follow_up}</p>`
            location.innerHTML += `<p>Agreed to Meeting? ${data.potential_clients[i].agreed_to_meeting}</p>`
        }
    }
}

// loads show page content on load
window.onload = function() {
    const parts = window.location.href.split("/");
    const id = parts[parts.length - 1]; 
    $.get("/business_services/" + id + ".json", function(data) {
        showPC(data)
         
         // re-set the id to current on the link
         $(".js-next").attr("data-id", data["id"]);
    })
  };












// })




// not working
// $(function() {
//     getServices()
//     $('#services u').on('click', function() {
//         debugger
//         alert("Testing if button2 works")
//     })
// })




// $(function() {
//     $("#new_potential_client").on("submit", function(e) {
//         $.ajax({
//             type: "POST",
//             url: this.action,
//             data: $(this).serialize(),
//             success: function(response){
//                 let newClient = new PotentialClient(response) 
//                 newClient.newClientHtml()
                
//                 $("#new_potential_client")[0].reset()
//                 $("#submit-button").attr("disabled", false)
//             }
//         })
//         e.preventDefault()
//     })    
// })