class BusinessServicesPotentialClientSerializer < ActiveModel::Serializer
  attributes :id, :business_service_id, :potential_client_id

  belongs_to :potential_client
  belongs_to :business_service
end
