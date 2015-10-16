var os = require("os");

var config = {
    // App infos
    app: {
        name: "Tolido Client",
        port: 5050
    },
    server: "http://" + os.hostname() + ":3000", //A modifier si le client ne tourne pas sur le même hôte que le serveur
}
module.exports = config;
