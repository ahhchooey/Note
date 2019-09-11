class Notebook < ApplicationRecord
  validates :title, length: {minimum: 2}
  validates :user_id, :title, presence: true
  validates :user_id, uniqueness: {scope: :title, message: "already used this name."}

  belongs_to :user
  has_many :notes
end
