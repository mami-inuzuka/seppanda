# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

gem 'rack-rewrite', '~> 1.5.0'
require 'rack/rewrite'

if ENV['RACK_ENV'] == 'production'
    use Rack::Rewrite do
        r301 %r{.*}, 'https://seppanda.com$&', :if => Proc.new {|rack_env|
          rack_env['SERVER_NAME'] != 'seppanda.com'
        }
    end
end

run Rails.application
Rails.application.load_server
