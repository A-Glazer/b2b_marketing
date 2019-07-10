class PotentialClient < ApplicationRecord
    has_many :business_services, through: :meeting
end
