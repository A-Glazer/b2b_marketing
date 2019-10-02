Business Service index page (shows each service):

<ol>
<% @business_services.each do |service| %>
  <% if @user.id == service.user_id %>
      <li> Service: <%= service.name %><br>
      Description: <%= service.description %><br>
      <%= link_to "See More", business_service_path(service) %> </li>
      <br>
  <% end %>
<% end %>
</ol>



Layouts/application - section goes in body

  <% unless controller_name == "sessions" || controller_name == "users"%>
    <%= link_to "Home",  user_path(current_user) %>
    <%= link_to "Create a New Business Service", new_business_service_path %>
    <%= link_to 'Log Out', logout_path, method: :delete %>
  <% end %>
    <%= yield %>