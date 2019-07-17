class BusinessService < ApplicationRecord
    belongs_to :user
    belongs_to :potential_client, optional: true
    
    validates :name, presence: true

end
