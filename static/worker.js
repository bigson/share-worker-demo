importScripts('./socket.io.min.js')
const socket = io('localhost:3000', { transports: ["websocket"] });

onconnect = function (event) {
    // console.log('share worker')
    const port = event.ports[0];

    socket.on("connect", () => {
        // console.log('client connect')
        port.postMessage({action : 'connect'});
    })
    socket.on("total", (count) => {
        // console.log('event total', count)
        port.postMessage({action : 'total', total : count});
    });
    socket.on("data", (data) => {
        // console.log('client received data', data)
        port.postMessage({action : 'data', data});
    });

    port.onmessage = function (e) {
        console.log('port.onmessage', e)
        switch(e.data.action){
            case 'workerData':
                socket.emit('data', e.data.data)
                break;
            case 'getTotal':
                console.log('worker get total')
                socket.emit('getTotal')
                break;
        }
    };
};