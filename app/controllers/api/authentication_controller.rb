# frozen_string_literal: true

#
# gem 'firebase-auth-rails'を用いてIDトークンからpayloadを取得するためのメソッドを記述したコントローラー
# payloadから取得した情報を扱う場合このコントローラーを継承させる
#
class API::AuthenticationController < API::ApplicationController
  private

  def token_from_request_headers
    request.headers['Authorization']&.split&.last
  end

  def token
    params[:token] || token_from_request_headers
  end

  def payload
    @payload ||= FirebaseIdToken::Signature.verify(token)
  end
end
