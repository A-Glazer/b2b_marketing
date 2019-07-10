class CreateBusinessServices < ActiveRecord::Migration[5.2]
  def change
    create_table :business_services do |t|
      t.string :name
      t.string :description
      t.integer :user_id
      t.integer :potential_client_id

      t.timestamps
    end
  end
end
