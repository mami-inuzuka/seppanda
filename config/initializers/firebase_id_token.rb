FirebaseIdToken.configure do |config|
  config.project_ids = [ENV['FIREBASE_PROJECT_ID']]
  config.redis = Redis.new
end
