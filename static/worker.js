importScripts('./socket.io.min.js')
const socket = io('localhost:3000', { transports: ["websocket"] });

onconnect = function (event) {
    console.log('share worker')
    const port = event.ports[0];

    socket.on("connect", () => {
        console.log('client connect')
        port.postMessage(['connect']);
    })
    socket.on("total", (count) => {
        console.log('event total', count)
        port.postMessage(['total', count]);
    });
    socket.on("data", (data) => {
        console.log('client received data', data)
        port.postMessage(['data', data]);
    });
    socket.on("data2", (data) => {
        console.log('client received data2', data)
        port.postMessage(['data', data]);
    });

    port.onmessage = function (e) {
        console.log('port.onmessage', e)
        let [type, ...params] = e.data
        // console.log(type, params)
        console.log('client emit data', type, params)
        switch(type){
            case 'workerData':
                socket.emit('data', params[0])
                break;
        }
        // const workerResult = `Result: ${e.data[0] * e.data[1]}`;
        // port.postMessage(workerResult);
    };
};