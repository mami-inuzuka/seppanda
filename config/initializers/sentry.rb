Sentry.init do |config|
  config.dsn = 'https://334fc8de520a4e12ac694ff8e830df9e@o1291892.ingest.sentry.io/6513311'
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]
  # Set traces_sample_rate to 1.0 to capture 100%
  # of transactions for performance monitoring.
  # We recommend adjusting this value in production.
  config.traces_sample_rate = 1.0
  # or
  config.traces_sampler = lambda do |context|
    true
  end
  config.enabled_environments = ['production']
end
