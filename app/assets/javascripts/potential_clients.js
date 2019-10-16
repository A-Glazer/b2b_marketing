$(function() {
    // $("a.load_clients").on("click", function(e){
    //     $.get(this.href).success(function(json){
    //         let allClients = $('#pc_new_form ol')
    //         allClients.text('')

    //         json.forEach(function(client){
    //             debugger
    //             allClients.append('<li>' + client + '</li>')
    //         })
    //     })
    //     e.preventDefault()
    // })
     
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
        Agreed to Meeting? ${this.agreed_to_meeting},
        `) +
        '</li>'
    $('#potential-client-list').append(html)
}


function getClients() {
    $.ajax({
        url: (BASE_URL + `/business_services`),
        method: 'get',
        dataType: 'json',
        success: function(data) {
            
            console.log("the data is: ", data[1].potential_clients)
            // document.getElementById('client-info').innerHTML = ""
            // I want it to display: data[business_service id#].potential_clients. I can't figure out how to find the id
            // const businessServiceId = document.querySelector('div#about_business_service p').innerHTML
            data[`${businessServiceId}`].potential_clients.map(potential_client => {
            //   debugger
                const newClient = new PotentialClient(potential_client)
                const newClientHtml = newClient.newClientHtml()
           
                document.getElementById('client-info').innerHTML += newClientHtml
            })
        }
    })
}



// class PotentialClient {
//     constructor(obj) {
//         this.id = obj.id
//         this.name = obj.name
//         this.last_contacted = obj.last_contacted
//         this.reply = obj.reply
//         this.follow_up = obj.follow_up
//         this.agreed_to_meeting = obj.agreed_to_meeting
//         // this.business_service_id = obj.business_service_id
//     }

//     static newClientForm() {
//         return (`
//         <br>
//         <strong>New Potential Client Form</strong>
//         <br>
//             <form onsubmit="createPotentialClient();">
//             <label>Name: </label>
//             <input type="text" id="name"></input>
//             <br>
//             <label>Last Contacted: </label>
//             <input type="text" id="last_contacted"></input>
//             <br>
//             <label>Reply: </label>
//             <input type="text" id="reply"></input>
//             <br>
//             <label>Follow_up: </label>
//             <input type="text" id="follow_up"></input>
//             <br>
//             <label>Agreed to Meeting?: </label>
//             <input type="text" id="agreed_to_meeting"></input>
//             <br>
            
//             <br>

//             <input type="submit" value="Submit"></input>
//             </form>
//         `)
//     }
// }


function listenForNewClientForm() {
        let newClientForm = PotentialClient.newClientForm()
        document.querySelector('div#potential-client-form').innerHTML = newClientForm
        
    // })
}

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


