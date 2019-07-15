class BusinessService < ApplicationRecord
    belongs_to :user
    belongs_to :potential_client, optional: true
    # has_many :meetings
    # has_many :potential_clients, through: :meetings
end
