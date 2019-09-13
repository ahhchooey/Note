class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :username
      t.integer :default_notebook, default: 0
      t.timestamps
    end

    add_index :users, :session_token, unique: true
    add_index :users, :email, unique: true
  end
end
