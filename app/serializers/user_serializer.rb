class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :uid
  
  has_many :business_services 
  has_many :potential_clients, through: :business_services
end
