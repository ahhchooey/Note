class CreateNotes < ActiveRecord::Migration[5.2]

  def note_body
    initial = {
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [
              {
                object: "text",
                text: "",
              }
            ]
          }
        ]
      }
    }
    return JSON.generate(initial)
  end

  def change
    create_table :notes do |t|
      t.string :title, null: false, default: "Untitled"
      t.json :body, default: note_body
      t.integer :user_id, null: false
      t.integer :notebook_id, null: false
      t.timestamps
    end

    add_index :notes, :user_id
    add_index :notes, :notebook_id
  end
end
