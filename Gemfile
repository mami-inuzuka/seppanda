# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.1'

gem 'bootsnap', '>= 1.4.4', require: false
gem 'dotenv-rails'
gem 'firebase-auth-rails'
gem 'google-cloud-storage'
gem 'image_processing', '~> 1.2'
gem 'jbuilder', '~> 2.7'
gem 'kaminari'
gem 'mini_magick'
gem 'pg'
gem 'puma', '~> 5.0'
gem 'rack-cors'
gem 'rack-rewrite'
gem 'rails', '~> 6.1.4', '>= 6.1.4.4'
gem 'rails-i18n'
gem 'redis'
gem 'sentry-rails'
gem 'sentry-ruby'
gem 'whenever', require: false

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'mailcatcher'
  gem 'rspec-rails', '~> 5.0.0'
end

group :development do
  gem 'listen', '~> 3.3'
  gem 'spring'

  # not default
  gem 'rubocop', require: false
  gem 'rubocop-fjord', '~> 0.2.0', require: false
  gem 'rubocop-performance', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
  gem 'spring-commands-rspec'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
