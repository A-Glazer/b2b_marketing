class BusinessService < ApplicationRecord
    belongs_to :user
    # belongs_to :potential_client, optional: true
    belongs_to :business_services_potential_client
    
    
    validates :name, presence: true

end
