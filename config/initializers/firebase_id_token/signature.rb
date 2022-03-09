module FirebaseIdToken
  class Signature
    # issue: https://github.com/fschuindt/firebase_id_token/issues/21
    if Rails.env == 'development'
      JWT_DEFAULTS = { algorithm: 'RS256', verify_iat: false }
    end
  end
end
