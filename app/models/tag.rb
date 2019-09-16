class Tag < ApplicationRecord
  validates :title, length: {minimum: 2}
  validates :user_id, :title, presence: true
  validates :user_id, uniqueness: {scope: :title, message: "already created this tag."}

  belongs_to :user
  has_many :note_tags
  has_many :notes,
    through: :note_tags,
    source: :note
end
