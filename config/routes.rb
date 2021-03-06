Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :notebooks, only: [:create, :index, :show, :update, :destroy]
    resources :notes, only: [:create, :index, :show, :update, :destroy]
    resources :tags, only: [:index, :create, :update, :destroy]
    resources :notes_tags, only: [:create, :destroy]
    resources :trashes, only: [:create, :index, :show, :destroy]
  end
end
