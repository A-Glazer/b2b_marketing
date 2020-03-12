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

$(function() {
    $("#input#submit-button").on("submit", function(e) {
        // debugger
        $.ajax({
            type: "POST",
            url: this.action,
            data: $(this).serialize(),
            success: function(response){
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

function PotentialClient(obj) {
    this.id = obj.id
    this.name = obj.name
    this.last_contacted = obj.last_contacted
    this.reply = obj.reply
    this.follow_up = obj.follow_up
    this.agreed_to_meeting = obj.agreed_to_meeting    
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
    $('.potential-client-list').append(html)
}

function getClients() {
    document.querySelector('div#potential-client-list').innerHTML = ""
    $.ajax({
        url: this.action,
        method: 'GET',
        dataType: 'JSON',
        success: function(data) {
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
