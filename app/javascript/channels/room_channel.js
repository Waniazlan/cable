import consumer from "./consumer"

document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById('room-id');
  if (element) {
    const roomId = element.getAttribute('data-room-id');
    
    console.log('Room ID:', roomId);

    const chatChannel = consumer.subscriptions.create({ channel: "RoomChannel", room_id: roomId }, {
      connected() {
        console.log('Connected to room:', roomId);
      },

      disconnected() {
        console.log('Disconnected from room:', roomId);
      },

      received(data) {
        console.log('Received data:', data);
        console.log('Message content:', data.message);
        
        const messages = document.querySelector('#messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerText = data.message;
        messages.appendChild(messageElement);
      },

      speak(message) {
        this.perform('speak', { message: message });
      }
    });

    const messageInput = document.querySelector('#message-input');
    const sendButton = document.querySelector('#send-button');

    sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      console.log('Sending message:', message);
      chatChannel.speak(message);
      messageInput.value = '';
    });
  } else {
    console.error('Element with id "room-id" not found.');
  }
});
