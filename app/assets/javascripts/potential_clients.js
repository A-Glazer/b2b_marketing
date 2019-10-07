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
// need business service dropdown in pc form

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

    console.log(potential_client)
    const businessServiceId = document.querySelector('div#about_business_service p').innerHTML
    // debugger
    // $.ajax({
    //     url: (BASE_URL + `/business_services/${businessServiceId}`),
    //     method: 'POST',
    //     dataType: 'json',
    //     success: function(data) {
           
    //         console.log(data)
    //     }
    // })
    
    // fetch(BASE_URL + `/business_services/${businessServiceId}`), { 
    // fetch((`http://localhost:3000/business_services/${businessServiceId}`), { 
        fetch((`http://localhost:3000/business_services`), { 
        method: 'POST',
        body: JSON.stringify( potential_client ),
        // body: potential_client,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')

        }

    }).then(resp => resp.json())
    .then(data => {
        console.log(data)
        // debugger
        getClients()
    })
}

// dropdown of bs
function dropdowns(){
    document.getElementById("dropdownList").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            
            }
        } 
    }
}
   



// function listenForClientClick() {
    //     $('button#info-data').on('click', function(event) {
    //         event.preventDefault()
    //         getServices()
    //     })
    // }
