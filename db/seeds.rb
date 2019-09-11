# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
User.create(email: "demo@demo.io", password: "password1", username: "demo")


Notebook.destroy_all
Notebook.create(title: "testbook1", user_id: 1)
Notebook.create(title: "testbook2", user_id: 1)
