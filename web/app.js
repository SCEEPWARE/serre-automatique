const socket = new WebSocket('ws://localhost:2026');
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Change le texte inclus dans la division
socket.addEventListener('message', function(event){
    let obj = JSON.parse(event.data);
    console.log(obj);
    var div = document.getElementById(obj.id);
    div.innerHTML = obj.value;
});

// document.getElementById('sub').onclick = function(){
//     var msgToSend = document.getElementById('msg').value;
//     console.log(msgToSend);
//     socket.send(msgToSend);
// };