class BusinessServicesPotentialClient < ApplicationRecord
    belongs_to :potential_client
    belongs_to :business_service
end
