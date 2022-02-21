Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :auth do
      resources :registrations, only: %i[create]
      resources :sessions, only: %i[index]
    end

    resources :payments
    resources :teams, only: %i[show] do
      patch :payments, to: 'teams/payments#update'
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
