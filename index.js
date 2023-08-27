const express    = require('express');
const http       = require('http');

// SOCKET SERVER
const appSocket    = express();
const serverSocket = http.createServer(appSocket);
const { Server }   = require("socket.io");
const io           = new Server(serverSocket, {
                                                transports: ["websocket"],
                                                cors: {
                                                    origin: "*"
                                                }
                                            });

// appSocket.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });
io.on('connection', (socket) => {
    console.log('a user connected' , io.engine.clientsCount);

    socket.conn.on("close", (reason) => {
        console.log('a user disconnected:' + reason, io.engine.clientsCount);
        socket.broadcast.emit("total", io.engine.clientsCount);
    });

    socket.on('data', (arg) => {
        console.log('server on data:', arg)
        socket.broadcast.emit("data", arg, (error, response) => {
            console.log(error, response, 'data')
        });
        socket.broadcast.emit("data2", arg, (error, response) => {
            console.log(error, response, 'data2')
        });
    })

    socket.emit("total", io.engine.clientsCount);
});
serverSocket.listen(3000, () => {
    console.log('Socket listening on *:3000');
});

const app = express();
const server = http.createServer(app);
app.use('/', express.static('static'))
server.listen(9119, () => {
    console.log('server listening on *:8000');
});