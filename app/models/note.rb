class Note < ApplicationRecord
  validates :title, :user_id, :notebook_id, presence: true
  validates :title, length: {minimum: 2}

  belongs_to :user
  belongs_to :notebook

  after_initialize :ensure_title

  def ensure_title
    self.title ||= "Untitled"
  end
end
