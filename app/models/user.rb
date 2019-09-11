class User < ApplicationRecord
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create
  validates :password, length: {minimum: 8, maximum: 16}, allow_nil: true
  #validates_format_of :password, :with => /\A^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$\Z/i
  validates :email, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true

  attr_reader :password
  after_initialize :ensure_session_token

  has_many :notebooks
  has_many :notes

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token
    self.session_token = SecureRandom::urlsafe_base64
    self.save
    self.session_token
  end

  def password=(pw)
    self.password_digest = BCrypt::Password.create(pw)
    @password = pw
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end

  def self.find_by_creds(email, pw)
    user = User.find_by(email: email)
    return nil unless user
    (user.is_password?(pw)) ? user : nil
  end
end
