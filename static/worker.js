const socket = io('localhost:3000', { transports: ["websocket"] });

socket.on("change", (total) => {
    document.querySelector('#text').innerHTML = total
});