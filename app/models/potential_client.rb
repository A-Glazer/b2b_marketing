class PotentialClient < ApplicationRecord
    has_many :business_services
    has_many :users, through: :business_services

    validates :follow_up, allow_blank: true
    validates :agreed_to_meeting, inclusion: { in: %w(yes no), message: "Please enter yes or no"}
end
