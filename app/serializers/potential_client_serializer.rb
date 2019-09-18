class PotentialClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :last_contacted, :reply, :follow_up, :agreed_to_meeting, :business_service_id

  has_many :business_services_potential_client
  has_many :business_services, through: :business_services_potential_client
end
