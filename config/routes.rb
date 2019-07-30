Rails.application.routes.draw do
  resources :business_services_potential_clients
  root 'sessions#home'
  
  get '/signup' => 'users#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  get '/meetings' => 'potential_clients#meetings'

 
  #omniauth callback
  get '/auth/facebook/callback' => 'sessions#facebook_create'
  
  resources :users
  resources :business_services do
    resources :potential_clients
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
