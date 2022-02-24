# frozen_string_literal: true

namespace :firebase do
  namespace :certificates do
    desc "Request Google's x509 certificates when Redis is empty"
    task request: :environment do
      FirebaseIdToken::Certificates.request
    end

    desc "Request Google's x509 certificates and override Redis"
    task force_request: :environment do
      FirebaseIdToken::Certificates.request!
    end
  end
end
