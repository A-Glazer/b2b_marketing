class PotentialClient < ApplicationRecord
    
    has_many :business_services_potential_client
    has_many :business_services, through: :business_services_potential_client
    
    
    validates :name, presence: true, uniqueness: true
    
    scope :find_client, -> (params) { where(id: params[:id]) }

    scope :meeting_yes, -> { where(agreed_to_meeting: 'yes') }

    
end

# accepts_nested_attributes_for :business_services
# scope :created_before, { where("created_at < ?", time) }
# scope :created_before, ->(date) { where("created_at < ?", date) }
