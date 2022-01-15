class Api::TestController < ApplicationController
  def index
    render json: {message: "hello"}
  end
end
