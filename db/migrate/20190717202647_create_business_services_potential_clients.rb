class CreateBusinessServicesPotentialClients < ActiveRecord::Migration[5.2]
  def change
    create_table :business_services_potential_clients do |t|
      t.integer :business_service_id
      t.integer :potential_client_id

      t.timestamps
    end
  end
end
