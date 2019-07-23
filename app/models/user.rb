class User < ApplicationRecord
    has_secure_password

    has_many :business_services 
    has_many :potential_clients, through: :business_services

    validates :username, presence: true, uniqueness: true

    def self.find_or_create_by_omniauth(auth)
        self.where(uid: auth['uid']).first_or_create do |user|
            user.username = auth['info']['name']
            user.password = SecureRandom.hex
            user.save
        end
    end

end

