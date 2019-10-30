# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Business Services
BusinessService.create(name: "Seo", description: "Online marketing", user_id: 1)
BusinessService.create(name: "Graphics", description: "Logos, ads", user_id: 1)
BusinessService.create(name: "Video", description: "Promotional Videos", user_id: 1)

PotentialClient.create(name: "Jonny", last_contacted: "08/31/2018", reply: "Not right now, please follow up in a year", follow_up: "08/31/2019", agreed_to_meeting: "no")
PotentialClient.create(name: "Robert", last_contacted: "02/18/2019", reply: "Very interested", follow_up: "04/30/2019", agreed_to_meeting: "yes")
PotentialClient.create(name: "Sara", last_contacted: "06/21/2019", reply: "busy now, follow up in a month", follow_up: "08/01/2019", agreed_to_meeting: "no")
PotentialClient.create(name: "Aaron", last_contacted: "08/09/2019", reply: "Call back", follow_up: "12/12/2019", agreed_to_meeting: "no")
PotentialClient.create(name: "Carol", last_contacted: "06/02/2015", reply: "Wants more details", follow_up: "06/25/2015", agreed_to_meeting: "no")
PotentialClient.create(name: "Thomas", last_contacted: "01/05/2016", reply: "Not interested", follow_up: "01/05/2020", agreed_to_meeting: "no")
PotentialClient.create(name: "Henry", last_contacted: "08/09/2012", reply: "Very interested", follow_up: "08/01/2019", agreed_to_meeting: "yes")

User.create(username: "Avi", password: "test")
User.create(username: "Test2", password: "123")

BusinessServicesPotentialClient.create(business_service_id: 2, potential_client_id: 1)
BusinessServicesPotentialClient.create(business_service_id: 3, potential_client_id: 2)
BusinessServicesPotentialClient.create(business_service_id: 1, potential_client_id: 3)
BusinessServicesPotentialClient.create(business_service_id: 2, potential_client_id: 4)
BusinessServicesPotentialClient.create(business_service_id: 2, potential_client_id: 5)
BusinessServicesPotentialClient.create(business_service_id: 3, potential_client_id: 6)
BusinessServicesPotentialClient.create(business_service_id: 1, potential_client_id: 7)

# BusinessService.create(id: 1, name: "Seo", description: "Online marketing", user_id: 2)
# BusinessService.create(id: 2, name: "Graphics", description: "Logos, ads", user_id: 1)
# BusinessService.create(id: 3, name: "Video", description: "Promotional Videos", user_id: 2)

# PotentialClient.create(id: 1, name: "Jonny", last_contacted: "08/31/2018", reply: "Not right now, please follow up in a year", follow_up: "08/31/2019", agreed_to_meeting: "no")
# PotentialClient.create(id: 2, name: "Robert", last_contacted: "02/18/2019", reply: "Very interested", follow_up: "04/30/2019", agreed_to_meeting: "yes")
# PotentialClient.create(id: 3, name: "Sara", last_contacted: "06/21/2019", reply: "busy now, follow up in a month", follow_up: "08/01/2019", agreed_to_meeting: "no")

# User.create(id: 1, username: "Avi", password: "test")
# User.create(id: 2, username: "Test2", password: "123")

# BusinessServicesPotentialClient.create(business_service_id: 2, potential_client_id: 1)
# BusinessServicesPotentialClient.create(business_service_id: 3, potential_client_id: 1)
# BusinessServicesPotentialClient.create(business_service_id: 3, potential_client_id: 3)
# BusinessServicesPotentialClient.create(business_service_id: 1, potential_client_id: 2)