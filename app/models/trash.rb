class Trash < ApplicationRecord
  validates :title, :body, :user_id, presence: true

  belongs_to :user
end
