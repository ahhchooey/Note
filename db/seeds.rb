# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Notebook.destroy_all
Note.destroy_all
Tag.destroy_all
NoteTag.destroy_all


user1 = User.create(email: "demo@demo.io", password: "password1", username: "demo", default_notebook: 1)

masterbook = Notebook.create(title: "Masterbook", user_id: user1["id"])
notebook1 = Notebook.create(title: "testbook1", user_id: user1["id"])
notebook2 = Notebook.create(title: "testbook2", user_id: user1["id"])

note4 = Note.create(title: "testnote4", user_id: user1["id"], notebook_id: notebook2["id"])
note3 = Note.create(title: "testnote3",  user_id: user1["id"], notebook_id: notebook2["id"])
note2 = Note.create(title: "testnote2", user_id: user1["id"], notebook_id: notebook1["id"])
note1 = Note.create(title: "testnote1", user_id: user1["id"], notebook_id: notebook1["id"])
first_note = Note.create(title: "First Note", user_id: user1["id"], notebook_id: masterbook["id"])

tag1 = Tag.create(title: "Cows", user_id: user1["id"])
tag2 = Tag.create(title: "Spaghetti", user_id: user1["id"])
tag3 = Tag.create(title: "Bear", user_id: user1["id"])
tag4 = Tag.create(title: "No", user_id: user1["id"])

NoteTag.create(note_id: first_note["id"], tag_id: tag1["id"])
NoteTag.create(note_id: note1["id"], tag_id: tag1["id"])
NoteTag.create(note_id: note2["id"], tag_id: tag1["id"])
NoteTag.create(note_id: note3["id"], tag_id: tag2["id"])
NoteTag.create(note_id: note4["id"], tag_id: tag3["id"])
NoteTag.create(note_id: first_note["id"], tag_id: tag1["id"])
NoteTag.create(note_id: note1["id"], tag_id: tag4["id"])
NoteTag.create(note_id: note3["id"], tag_id: tag3["id"])

