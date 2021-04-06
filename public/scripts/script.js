let socket = io();
const messages = document.querySelector('#chat ol');
const input = document.getElementById('message');
const form = document.getElementsByTagName('form')[0];
const typingText = document.getElementById('typing');

let typing = false;
let typingTimeout = undefined;
var startTyping;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let value = e.target[0].value;
  if (value) socket.emit('message', value), (value = '');
});

form.addEventListener('keyup', () => {
  const isTypingTimeoutDuration = 3000;
  clearTimeout(typingTimeout);

  typingText.hidden = false;

  typing = true;
  socket.emit('typing', typing);

  typingTimeout = setTimeout(() => {
    typing = false;
    typingText.hidden = true;
    socket.emit('typing', typing);
  }, isTypingTimeoutDuration);
});

socket.on('message', (emitted) => {
  console.log(emitted);
  // Display message in the chat
  let newMessage = document.createElement('li');
  newMessage.textContent = emitted;
  messages.appendChild(newMessage);
});

socket.on('typing', (emitted) => {
  console.log(emitted);
  let statusString = document.getElementsByTagName('small')[0];
  let name = (statusString.children[0].setAttribute = 'block');
});

socket.on('connected', (e) => {
  socket.emit('status', 'online');
});
