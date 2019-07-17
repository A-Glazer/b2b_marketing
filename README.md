# README

** Need to create error messages

** Need to be able to edit each client's info
** Need to be able to delete client's info

** Need to be able to edit Business Service Info
** Need to be able to delete Business Service Info

** Create validations

** Create Scope

users has p.clients
users has b.services

p.clients has 

services has clients thru b.services

all clients belonging to service
    query the join table 


      create_table "business_services_potential_clients", force: :cascade do |t|
    t.integer "potential_client_id"
    t.integer "business_service_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end