$(function() {

    
    
    
    
    $("#new_potential_client").on("submit", function(e) {
        // debugger
        $.ajax({
            type: "POST",
            url: this.action,
            data: $(this).serialize(),
            success: function(response){
                // debugger
                let newClient = new PotentialClient(response) 
                newClient.newClientHtml()
                
                $("#new_potential_client")[0].reset()
                $("#submit-button").attr("disabled", false)
            }
        })
        e.preventDefault()
    })    
})

function PotentialClient(obj) {
    this.id = obj.id
    this.name = obj.name
    this.last_contacted = obj.last_contacted
    this.reply = obj.reply
    this.follow_up = obj.follow_up
    this.agreed_to_meeting = obj.agreed_to_meeting
    // this.business_service_id = obj.business_service_id
    
}

PotentialClient.prototype.newClientHtml = function() {
    let html = '<li>' +
    (`
    Name: ${this.name}, 
    Last Contacted: ${this.last_contacted},
    Reply: ${this.reply},
    Follow up: ${this.follow_up},
    Agreed to Meeting? ${this.agreed_to_meeting}
    `) +
    '</li>'
    $('#potential-client-list').append(html)
}

// $("#potential-client-list").on("click", function(e){
//     $.ajax({
//         type: "GET",
//         url: this.action,
//         data: $(this).serialize(),
//         success: function(response){
//             console.log("The response is: ", response)
//             // let newClient = new PotentialClient(response) 
//             // newClient.newClientHtml()
//         }
//     })
//     e.preventDefault()    
// })

function getClients() {
    // document.querySelector('div#potential-client-list').innerHTML = ""
    $.ajax({
        url: this.action,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
            console.log("the data is: ", data)
            // document.getElementById('info').innerHTML = ""
            let BSId = data["id"]
            data["potential_clients"].map(potential_client => {
                let newClient = new PotentialClient(potential_client) 
                newClient.newClientHtml()

                
            })
            
            
            // data.map(business_service => {
            //     const newService = new BusinessService(business_service)
            //     const newServiceHtml = newService.newServiceHtml()
           
            //     document.getElementById('info').innerHTML += newServiceHtml
            //     showServiceOnClick()
            // })
        }
    })
}


// trying to create a new pc form





// function getClients() {
    //         $.ajax({
//                 url: (BASE_URL + `/business_services`),
//                 method: 'get',
//                 dataType: 'json',
//                 success: function(data) {
    
//                         console.log("the data is: ", data[1].potential_clients)
//                         // document.getElementById('client-info').innerHTML = ""
//                         // I want it to display: data[business_service id#].potential_clients. I can't figure out how to find the id
//                         // const businessServiceId = document.querySelector('div#about_business_service p').innerHTML
//                         data[`${businessServiceId}`].potential_clients.map(potential_client => {
    //                             //   debugger
//                                 const newClient = new PotentialClient(potential_client)
//                                 const newClientHtml = newClient.newClientHtml()
                
//                 document.getElementById('client-info').innerHTML += newClientHtml
//             })
//         }
//     })
// }




// function listenForNewClientForm() {
//         let newClientForm = document.querySelector('div#potential-client-form')
//         // document.querySelector('div#potential-client-form').innerHTML = newClientForm
//         let html = `
//         <form 
//         `

    
        
// }




// function createPotentialClient(e) {
//     // e.preventDefault
//     const potential_client = {
//         name: document.getElementById('name').value,
//         last_contacted: document.getElementById('last_contacted').value, 
//         reply: document.getElementById('reply').value,
//         follow_up: document.getElementById('follow_up').value,
//         agreed_to_meeting: document.getElementById('agreed_to_meeting').value,
//         business_service_id: document.querySelector('div#bs_id').innerHTML
//     }

//     console.log(potential_client)
//     // let business_service_id: document.querySelector('div#bs_id').innerHTML
//     // debugger

//     let businessServiceId = potential_client["business_service_id"]
//     // fetch(BASE_URL + `/business_services/${businessServiceId}`), { 
//     fetch((`http://localhost:3000/business_services/${businessServiceId}/potential_clients`), { 
//         // fetch('http://localhost:3000/business_services/1/potential_clients', { 
//         method: 'POST',
//         body: JSON.stringify({ potential_client }),
//         // body: potential_client,
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')

//         }

//     }).then(resp => resp.json())
//     .then(data => {
//         console.log(data)
//         getClients()

//     })
// }


