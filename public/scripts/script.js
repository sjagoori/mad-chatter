let socket = io();
const messages = document.querySelector('#chat > ol');
const input = document.getElementById('message');
const form = document.getElementsByTagName('form')[0];
const typingText = document.getElementById('typing');
const message = document.getElementById('message');
const buzzerBtn = document.getElementById('buzzer-btn');
const chat = document.getElementById('chat');

let typing = false;
let typingTimeout = undefined;
var startTyping;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let name = e.target[0].value;
  let message = e.target[1].value;

  if (message != '') {
    // socket.emit('message', message);
    // socket.emit('name', name);
    socket.emit('message', { name: name, message: message });
    addMessage(message, name);
    e.target[1].value = '';
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
  socket.emit('buzzer', true);
});

socket.on('message', (emitted) => {
  new Audio('https://www.myinstants.com/media/sounds/msn-sound_1.mp3').play();
  console.log(emitted);
  addMessage(emitted.message, emitted.name);
  /*
  socket.emit({
    message: message,
    handle: nameString
  })
  */
});

socket.on('name', (nameString) => {
  console.log('nameString: ', nameString);
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

socket.on('buzzer', () => {
  document.body.classList.add('buzzing');

  new Audio('https://www.myinstants.com/media/sounds/nudge.mp3').play();

  setTimeout(() => {
    document.body.classList.remove('buzzing');
  }, 1000);
});

socket.on('onlineCount', (e) => {
  let counter = document.getElementById('onlineCount');
  counter.textContent = e + '\tmensen online!!!';
});

// Display message in the chat
function addMessage(message, name) {
  let newMessage = document.createElement('li');
  newMessage.innerText = `${name}: ${message}`;
  newMessage.setAttribute('class', 'newMessage');
  messages.appendChild(newMessage);
  newMessage.scrollIntoView(true);
  setTimeout(function () {
    newMessage.removeAttribute('class', 'newMessage');
  }, 1500);
}
