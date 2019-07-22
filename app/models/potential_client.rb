class PotentialClient < ApplicationRecord
    # scope :created_before, { where("created_at < ?", time) }
    # scope :created_before, ->(date) { where("created_at < ?", date) }
    
    # has_many :business_services
    # has_many :users, through: :business_services
    has_many :business_services_potential_client
    has_many :business_services, through: :business_services_potential_client
    
    # accepts_nested_attributes_for :business_services
    validates :name, presence: true, uniqueness: true
    # validates :agreed_to_meeting, inclusion: { in: %w(true false), true_or_false: "Please enter true or false"}


    scope :find_service, -> { where(id: params[:business_service_id]) }
   
    
end



# user has potentional clients through business business_services
# business service belongs to user and potential client (join table)


