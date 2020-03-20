// $(function() {
//     $("#input#submit-button").on("submit", function(e) {
//         $.ajax({
//             type: "POST",
//             url: this.action,
//             data: $(this).serialize(),
//             success: function(response){
//                 let newClient = new PotentialClient(response) 
//                 newClient.newClientHtml()
//                 debugger 

//                 $("#new_potential_client")[0].reset()
//                 $("#submit-button").attr("disabled", false)
//             }
//         })
//         e.preventDefault()
//     })    
// })
// const BASE_URL = 'http://localhost:3000'



// function PotentialClient(obj) {
//     this.id = obj.id
//     this.name = obj.name
//     this.last_contacted = obj.last_contacted
//     this.reply = obj.reply
//     this.follow_up = obj.follow_up
//     this.agreed_to_meeting = obj.agreed_to_meeting
// }

// PotentialClient.prototype.newClientHtml = function () {
//     let html = '<li>' +
//         (`
//     Name: ${this.name}, 
//     Last Contacted: ${this.last_contacted},
//     Reply: ${this.reply},
//     Follow up: ${this.follow_up},
//     Agreed to Meeting? ${this.agreed_to_meeting}
//     `) +
//         '</li>'
//     $('.potential-client-list').append(html)
// }

function getClients() {
    document.querySelector(".client-form-spot").innerHTML = ""
    document.querySelector('div#potential-client-list').innerHTML = ""
    $.ajax({
        url: this.action,
        method: 'GET',
        dataType: 'JSON',
        success: function (data) {
            console.log("the data is: ", data)
            // let bSId = data["id"]
            data["potential_clients"].map(potential_client => {
                let newClient = new PotentialClient(potential_client)
                // newClient.business_service_id = bSId
                if (newClient["name"] !== null) {
                    newClient.newClientHtml()
                }
            })
        }
    })
}


function listenForNewClientForm() {
    console.log("listenForNewClientForm() was hit")
    let newClientForm = PotentialClient.newClientForm()
    document.querySelector(".client-form-spot").innerHTML = newClientForm

}

class PotentialClient {
    constructor(obj) {
        this.id = obj.id
        this.name = obj.name
        this.last_contacted = obj.last_contacted
        this.reply = obj.reply
        this.follow_up = obj.follow_up
        this.agreed_to_meeting = obj.agreed_to_meeting
    }

    static newClientForm() {
        return (`
            <form onSubmit="createClient(); return false;">
            <label>Name: </label>
            <input type="text" id="name"></input>
            <br>

            <label>Last Contacted: </label>
            <input type="text" id="last_contacted"></input>
            <br>

            <label>Reply: </label>
            <input type="text" id="reply"></input>
            <br>

            <label>Follow Up: </label>
            <input type="text" id="follow_up"></input>
            <br>

            <label>Agreed to Meeting: </label>
            <input type="text" id="agreed_to_meeting"></input>
            <br>

            <input type="submit" value="Submit"></input>
            <br>
        `)
    }
}

function createClient() {
    // console.log("CreateClient function")
    const potential_client = {
        name: document.getElementById('name').value,
        last_contacted: document.getElementById('last_contacted').value,
        reply: document.getElementById('reply').value,
        follow_up: document.getElementById('follow_up').value,
        agreed_to_meeting: document.getElementById('agreed_to_meeting').value
    }

    const mainUrl = window.location.href.split("/")
    const num = mainUrl[mainUrl.length - 1]
    const id2 = parseInt(num)
    fetch(`${BASE_URL}/business_services/${id2}/potential_clients`, {
        method: 'POST',
        body: JSON.stringify({ potential_client }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        }
    })
    .then(resp => resp.json())
    .then(data => {
        console.log("data in create client fetch", data)
        showPC(data)
        document.querySelector(".client-form-spot").innerHTML = ""
    })
}


$(function () {
    $("#input#submit-button").on("submit", function (e) {
        // debugger
        $.ajax({
            type: "POST",
            url: this.action,
            data: $(this).serialize(),
            success: function (response) {
                console.log("response", response)
                let newClient = new PotentialClient(response)
                newClient.newClientHtml()
                // debugger 

                $("#new_potential_client")[0].reset()
                $("#submit-button").attr("disabled", false)
            }
        })
        e.preventDefault()
    })
})

    // PotentialClient.prototype.newClientHtml = function () {
    //     let html = '<li>' +
    //         (`
    //     Name: ${this.name}, 
    //     Last Contacted: ${this.last_contacted},
    //     Reply: ${this.reply},
    //     Follow up: ${this.follow_up},
    //     Agreed to Meeting? ${this.agreed_to_meeting}
    //     `) +
    //         '</li>'
    //     $('.potential-client-list').append(html)
    // }