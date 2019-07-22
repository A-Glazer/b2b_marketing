class CreatePotentialClients < ActiveRecord::Migration[5.2]
  def change
    create_table :potential_clients do |t|
      t.string :name
      t.datetime :last_contacted
      t.string :reply
      t.datetime :follow_up
      t.string :agreed_to_meeting
      t.integer :business_service_id

      t.timestamps
    end
  end
end
