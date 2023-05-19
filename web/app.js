const socket = new WebSocket('ws://localhost:2026');
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

socket.addEventListener('message', function(event){
    let obj = JSON.parse(event.data);
    var div = document.getElementById(obj.id);
    div.innerHTML = obj.value;
});

document.getElementById('sub').onclick = function(){
    var msgToSend = document.getElementById('msg').value;
    socket.send(msgToSend);
};