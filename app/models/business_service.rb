class BusinessService < ApplicationRecord
    belongs_to :user
    has_many :potential_clients, through: :meeting
end
