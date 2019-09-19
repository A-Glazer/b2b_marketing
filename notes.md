Good places to add js:

1. business_services index page:
    See More button should be js clickable

2. business_services show page
    See More should be js clickable and info appears on page

3. business_services/new page
    submit should submit on click

4. Potential Clients show page
    Create next and previous button for potential clients show page

5. Potenial clients new 
    when click create new potential client, the form should pop up on the page (instead of rerouting)
    -when you click submit, it should add new client to the page


Find out about this requirement: 
1. Must translate JSON responses from your Rails app into JavaScript Model Objects using either ES6 class or constructor syntax. The Model Objects must have at least one method on the prototype. (Formatters work really well for this.)
-add prototype -> add on using json
- turn response into js object
- use serializer 
(new coment let comment = new comment, comment has a constructor => look at recips.js link 19, 22) and then protype method is called on it

** change names in js folder to .js (not .coffee)