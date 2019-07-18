# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Business Services
BusinessService.create(id: 1, name: "Seo", description: "Online marketing", user_id: 2)
BusinessService.create(id: 2, name: "Graphics", description: "Logos, ads", user_id: 1)
BusinessService.create(id: 3, name: "Video", description: "Promotional Videos", user_id: 2)

PotentialClient.create(id: 1, name: "Jonny", last_contacted: "08/31/2018", reply: "Not right now, please follow up in a year", follow_up: "08/31/2019", agreed_to_meeting: "no")
PotentialClient.create(id: 2, name: "Robert", last_contacted: "02/18/2019", reply: "Very interested", follow_up: "04/30/2019", agreed_to_meeting: "yes")
PotentialClient.create(id: 3, name: "Sara", last_contacted: "06/21/2019", reply: "busy now, follow up in a month", follow_up: "08/01/2019", agreed_to_meeting: "no")

User.create(id: 1, username: "Avi", password: "test")
User.create(id: 2, username: "Test2", password: "123")

BusinessServicesPotentialClient.create(business_service_id: 2, potential_client_id: 1)
BusinessServicesPotentialClient.create(business_service_id: 3, potential_client_id: 1)
BusinessServicesPotentialClient.create(business_service_id: 3, potential_client_id: 3)
BusinessServicesPotentialClient.create(business_service_id: 1, potential_client_id: 2)