const BASE_URL = 'http://localhost:3000'

function displayService() {
    // if there is a form on this page, I want to clear it
    // let id = this.dataset.id
   
    let info = document.getElementById('info')
    info.innerHTML = '<ol>'
    fetch(BASE_URL + '/business_services.json')
    .then(resp => resp.json())
    .then(business_services => {
        info.innerHTML += business_services.map(business_service => `<li><a href="#" data-id="${business_service.id}">${business_service.name}</a> - ${business_service.description}</li>`).join('')
        info.innerHTML += '</ul>'
        
        // create eventListener on a click to see more button
        // looking at getTodos()
    }) 
}
