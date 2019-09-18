const BASE_URL = 'http://localhost:3000'

function displayService(e) {
    // if there is a form on this page, I want to clear it
    // let id = this.dataset.id
    let info = document.getElementById('info')

    fetch(BASE_URL + '/business_services' + '.json')
    .then(resp => resp.json())
    .then(business_services => {
        
    }) 
}