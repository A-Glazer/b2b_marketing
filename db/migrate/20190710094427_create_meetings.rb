class CreateMeetings < ActiveRecord::Migration[5.2]
  def change
    create_table :meetings do |t|
      t.integer :business_service_id
      t.integer :potential_client_id
      t.datetime :date
      t.datetime :time
      t.string :location

      t.timestamps
    end
  end
end
