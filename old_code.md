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