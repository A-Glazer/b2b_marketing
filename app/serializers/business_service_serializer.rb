class BusinessServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id
  belongs_to :user
  has_many :business_services_potential_client
  has_many :potential_clients, through: :business_services_potential_client
end
