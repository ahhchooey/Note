class CreateTrashes < ActiveRecord::Migration[5.2]
  def change
    create_table :trashes do |t|
      t.string :title, null: false
      t.json :body, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    add_index :trashes, :user_id
  end
end
