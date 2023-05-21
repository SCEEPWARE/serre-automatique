// Importation des modules requis
const WebSocketServer = require('ws');
const { spawn } = require('child_process');

// Création des variables (y'en a pas)




// Création d'un serveur websocket
const wss = new WebSocketServer.Server({ port: 2026 })
 
var number = 0;

// Création d'une connection avec le websocket
wss.on("connection", ws => {
    console.log("Nouveau client connecté");
 
    // envoie un message au client
    sendMsg("%status", "Vous êtes connecté!");
 
    // quand un message du client est reçu
    ws.on("message", data => {
        console.log(`Le client a envoyé: ${data}`)
    });
 
    // gère quand le client se déconnecte
    ws.on("close", () => {
        console.log("Le client s'est déconnecté");
    });
    // gère quand il y a une erreur
    ws.onerror = function () {
        console.log("Une erreur s'est produite")
    }


    // Créer les fonctions

    // Cette fonction permet d'envoyer un message avec une ID spécifique.
    // Le premier paramètre est l'ID. L'ID permet de remplacer l'endroit spécifique que l'on souhaite dans la page HTML.
    // Le second est le message. Le message est tout simplement le texte par lequel on remplace ce fichier.
    // Il y a plus haut (ligne 20 environ, dans tous les cas c'est le seul texte en français) un exemple d'utilisation (et aussi pour la partie python).

    function sendMsg(id, msg){
       var msgToSend = JSON.stringify({
           id: id,
           value: msg
        });
       ws.send(msgToSend);
    };


    // Partie python dans le javascript

    // Partie température

    // Récupérer valeur capteur
    const temperature_script = spawn('python', ['_temp.py']);
    temperature_script.stdout.on('data', function(data) {
    
        // // Coerce Buffer object to Float - pas traduit mais osef de cette partie là tu peux même la dégager si tu veux
        // temperatures.push(parseFloat(data));

        var temperature = parseFloat(data);
        console.log(temperature);

        sendMsg("%temp", temperature);
    });

});

// la ligne qui sert à (quasiment) rien
console.log("The WebSocket server is running on port 2026");