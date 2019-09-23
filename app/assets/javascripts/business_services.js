const BASE_URL = 'http://localhost:3000'

function getService() {
    // if there is a form on this page, I want to clear it
    // let id = this.dataset.id
    
    let info = document.getElementById('info')
    info.innerHTML = '<ol>'
    fetch(BASE_URL + '/business_services.json')
    .then(resp => resp.json())
    .then(business_services => {
        info.innerHTML += business_services.map(business_service => `<li><a href="#" data-id="${business_service.id}">${business_service.name}</a> - ${business_service.description}</li>`).join('')
        info.innerHTML += '</ul>'
        
        showServiceOnClick()
        // create eventListener on a click to see more button
        // looking at getTodos()
    }) 
    
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

function newService() {
    let form = document.getElementById('business-service-form')
    let html = `
        <form onsubmit="createBusinessService(); return false;">
            <label>Name: </label>
            <input type="text" id="name"></input>
            <br>
            <label>Description</label>
            <input type="text" id="description"></input>
            <br>
            <input type="submit" value="Create Business Service"></input>
        </form>
    `


}

}
