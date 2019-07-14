Rails.application.routes.draw do
  root 'sessions#home'
  
  get '/signup' => 'users#new'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  
  
  # resources :meetings
  resources :potential_clients
  resources :business_services
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
