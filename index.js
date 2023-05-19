// Importing the required modules
const WebSocketServer = require('ws');
const { spawn } = require('child_process');

// Créer les variables
const temperatures = []; // Store readings


// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 2026 })
 
var number = 0;

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");

    var connectSend = {
        id: "%status",
        value: "Welcome, you are connected!"
    }
 
    // sending message to client
    ws.send(connectSend);
 
    //on message from client
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
        number++;
        ws.send(jsonTempSend);
    });
 
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

// Récupérer valeur capteur
const temperature_script = spawn('python', ['_temp.py']);
temperature_script.stdout.on('data', function(data) {
    
    // // Coerce Buffer object to Float
    // temperatures.push(parseFloat(data));

    // // Log to debug
    // console.log(temperatures);
    var temperature = parseFloat(data);
    console.log(temperature);

    var tempSend = {
        id: "%temp",
        value: temperature
    }

    jsonTempSend = JSON.stringify(tempSend);
});

console.log("The WebSocket server is running on port 2026");