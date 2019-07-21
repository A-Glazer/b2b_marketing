class PotentialClient < ApplicationRecord
    # scope :created_before, { where("created_at < ?", time) }
    # scope :created_before, ->(date) { where("created_at < ?", date) }
    
    # has_many :business_services
    # has_many :users, through: :business_services
    has_many :business_services_potential_client
    has_many :business_services, through: :business_services_potential_client
    
    # accepts_nested_attributes_for :business_services

    # validates :agreed_to_meeting, inclusion: { in: %w(yes no), message: "Please enter yes or no"}
end



# user has potentional clients through business business_services
# business service belongs to user and potential client (join table)


