# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
user1 = User.create(email: "demo@demo.io", password: "password1", username: "demo")


Notebook.destroy_all
notebook1 = Notebook.create(title: "testbook1", user_id: user1["id"])
notebook2 = Notebook.create(title: "testbook2", user_id: user1["id"])


Note.destroy_all
note1 = Note.create(title: "testnote1", body: "testbody1", user_id: user1["id"], notebook_id: notebook1["id"])
note2 = Note.create(title: "testnote2", body: "testbody2", user_id: user1["id"], notebook_id: notebook1["id"])
note3 = Note.create(title: "testnote3", body: "testbody3", user_id: user1["id"], notebook_id: notebook2["id"])
note4 = Note.create(title: "testnote4", body: "testbody4", user_id: user1["id"], notebook_id: notebook2["id"])
