class User < ApplicationRecord
    # scope :included, -> { where(username: params[:user][:username]) }

    has_many :business_services 
    has_many :potential_clients, through: :business_services

    has_secure_password

    validates :username, presence: true, uniqueness: true

end
