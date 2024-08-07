class ChatController < ApplicationController

  def index
    @room_id = params[:room_id] || "default_room"
   
  
  end
end
