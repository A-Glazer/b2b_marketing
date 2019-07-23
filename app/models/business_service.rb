class BusinessService < ApplicationRecord
    belongs_to :user
    has_many :business_services_potential_client
    has_many :potential_clients, through: :business_services_potential_client
    
    validates :name, presence: true, uniqueness: true

end
