Rails.application.routes.draw do
  resources :potential_clients
  resources :business_services
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
