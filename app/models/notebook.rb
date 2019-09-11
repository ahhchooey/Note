class Notebook < ApplicationRecord
  validates :title, length: {minimum: 2}
  validates :user_id, :title, presence: true

  belongs_to :user
end
