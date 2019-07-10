class User < ApplicationRecord
    has_many :business_services 
    has_many :potential_clients, through: :business_services

    has_secure_password

    validates :username, presence: true, uniqueness: true
end
