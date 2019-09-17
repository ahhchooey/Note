class Note < ApplicationRecord
  validates :title, :user_id, :notebook_id, presence: true
  validates :title, length: {maximum: 34}

  belongs_to :user
  belongs_to :notebook
  has_many :notes_tags
  has_and_belongs_to_many :tags

  after_initialize :ensure_title

  def ensure_title
    self.title ||= "Untitled"
  end
end
