const socket = require("socket.io").Server;
const socketAuth = require("../middleware/socketAuth");
let io = null;

class Socket{

    #server;

    setServer(server){
        this.#server = server;
    }

    createConnection(){
        io = new socket(this.#server,{cors:true});
        io.use(socketAuth);

        io.on("connection", (socket) => {
            socket.join(socket.user.id);
        });
    }

    getIo(){
        return io;
    }
}

module.exports.socket = new Socket();