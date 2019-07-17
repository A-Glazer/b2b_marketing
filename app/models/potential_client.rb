class PotentialClient < ApplicationRecord
    # scope :created_before, { where("created_at < ?", time) }
    scope :created_before, ->(time) { where("created_at < ?", time) }
    
    has_many :business_services
    has_many :users, through: :business_services

   
    validates :agreed_to_meeting, inclusion: { in: %w(yes no), message: "Please enter yes or no"}
end
