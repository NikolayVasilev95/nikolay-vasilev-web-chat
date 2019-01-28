// Make connection

var socket = io.connect();

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    x = document.getElementById('myColor').value;

//User customs color

function myFunction() {
  document.getElementById("handle").disabled = true;
  x = document.getElementById('myColor').value;
}

//Emit events

btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('textInput', function () {
  socket.emit('typing', handle.value);
});

//Listen for addEventListener

socket.on('chat', function (data) {
  message.value = "";
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong style= "color: '+ x +';">' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message......</em></p>';
});
