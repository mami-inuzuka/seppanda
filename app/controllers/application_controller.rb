# frozen_string_literal: true

class ApplicationController < ActionController::API
  def fallback_index_html
    render file: 'public/index.html'
  end
end
