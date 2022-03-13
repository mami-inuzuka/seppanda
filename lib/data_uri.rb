require 'base64'

module DataURI
  def self.decode(str)
    Base64.decode64(str.split(',').last)
  end
end
