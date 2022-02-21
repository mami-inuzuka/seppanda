Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'overrides/registrations',
      confirmations: 'overrides/confirmations'
    }

    namespace :auth do
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
