Rails.application.routes.draw do
  root 'chat#index'
  get 'chat/:room_id', to: 'chat#index', as: 'chat_room'
end
