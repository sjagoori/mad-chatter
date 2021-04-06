let socket = io();
const messages = document.querySelector('#chat > ol');
const input = document.getElementById('message');
const form = document.getElementsByTagName('form')[0];
const typingText = document.getElementById('typing');
const message = document.getElementById('message');
const buzzerBtn = document.getElementById('buzzer-btn');

let typing = false;
let typingTimeout = undefined;
var startTyping;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let message = e.target[0].value;
  if (message != '') {
    socket.emit('message', message);
    addMessage(message);
    e.target[0].value = '';
  }
});

message.addEventListener('keypress', () => {
  const isTypingTimeoutDuration = 5000;
  clearTimeout(typingTimeout);

  typingText.hidden = false;

  typing = true;
  socket.emit('typing', typing);

  typingTimeout = setTimeout(() => {
    typing = false;
    socket.emit('typing', typing);
  }, isTypingTimeoutDuration);
});

buzzerBtn.addEventListener('click', () => {
  alert('BUZZZ'); //doet het ;)
});

socket.on('message', (emitted) => {
  addMessage(emitted);
});

socket.on('typing', (status) => {
  status ? (typingText.hidden = false) : (typingText.hidden = true);
});

socket.on('connected', (e) => {
  socket.emit('status', 'online');
});

socket.on('refresh', () => {
  location.reload();
});

// Display message in the chat
function addMessage(message) {
  let newMessage = document.createElement('li');
  newMessage.innerText = message;
  newMessage.setAttribute('class', 'newMessage');
  messages.appendChild(newMessage);
  newMessage.scrollIntoView(true);
  setTimeout(function () {
    newMessage.removeAttribute('class', 'newMessage');
  }, 1500);
}
