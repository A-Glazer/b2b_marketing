class CreateBusinessServices < ActiveRecord::Migration[5.2]
  def change
    create_table :business_services do |t|
      t.integer :user_id
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
