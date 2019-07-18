class BusinessServicesPotentialClient < ApplicationRecord
    has_many :potential_clients
    has_many :business_services
end
