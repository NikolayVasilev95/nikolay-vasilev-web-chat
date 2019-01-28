// Make connection

var socket = io.connect();

//Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    onlineusers = document.getElementById('OnlineUsers'),
    usersubmitbtn = document.getElementById('submit'),
    usercolor = 0;


//Emit events

usersubmitbtn.addEventListener('click', function () {
  usersubmitbtn.setAttribute("style", "cursor: not-allowed;");
  usersubmitbtn.disabled = true;
  handle.disabled = true;
  usercolor = document.getElementById('myColor').value;
  var disabled;
  disabled = document.getElementById('myColor').setAttribute("style", "cursor: not-allowed;");
  disabled = document.getElementById('myColor').disabled = true;
  socket.emit('online', handle.value);
});

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
  output.innerHTML += '<p><strong style= "color: '+ usercolor +';">' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message......</em></p>';
});

socket.on('online', function (data) {
  onlineusers.innerHTML += '<p><span><i class="fas fa-user-circle"></i> </span><strong>' + data + '</strong></p>';
});
