class User < ApplicationRecord
    has_many :business_services 
    has_many :potential_clients, through: :business_services
end
