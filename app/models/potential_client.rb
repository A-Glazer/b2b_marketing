class PotentialClient < ApplicationRecord
    # scope :created_before, { where("created_at < ?", time) }
    scope :created_before, ->(date) { where("created_at < ?", date) }
    
    # has_many :business_services
    # has_many :users, through: :business_services
    belongs_to :business_services_potential_client

   
    validates :agreed_to_meeting, inclusion: { in: %w(yes no), message: "Please enter yes or no"}
end
