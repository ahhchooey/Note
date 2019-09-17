class Tag < ApplicationRecord
  validates :title, length: {minimum: 2, maximum: 10}
  validates :user_id, :title, presence: true
  validates :user_id, uniqueness: {scope: :title, message: "already created this tag."}

  belongs_to :user
  has_many :notes_tags
  has_and_belongs_to_many :notes
end
