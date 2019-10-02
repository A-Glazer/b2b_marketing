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


View/user/show (removed all rails info in the show page)

<h1>Welcome <%= @user.username %>!</h1>

<p> Would you to: 

<ul>
<li><%= link_to "View Business Services", business_services_path %></li>
<li><%= link_to "Create a New Business Service", new_business_service_path %> </li> 

</ul>
</p>

 <%= link_to 'Log Out', logout_path, method: :delete %>



View/Sessions/home (removed all rails code in sessions home page)

<h1>Welcome to the B2B Marketing App</h1>

<p>Would you like to <%= link_to "Sign up", signup_path %> or <%= link_to "Login", login_path %>? </p>

or

<%= link_to "Sign in Through Facebook", '/auth/facebook' %>


