class PotentialClient < ApplicationRecord
    has_many :business_services
    has_many :users, through: :business_services
end
