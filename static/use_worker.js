const myWorker = new SharedWorker("/worker.js");
console.log('init worker')
myWorker.port.postMessage({action : 'getTotal'})

myWorker.port.onmessage = (e) => {
    // result1.textContent = e.data;
    console.log("Message received from worker", e);

    switch(e.data.action){
        case 'total':
            if(document.getElementById('text')){
                document.getElementById('text').innerHTML = e.data.total
            }

            if(document.getElementById('logs')){
                document.getElementById('logs').value += ("\nTổng số kết nối hiện tại" + e.data.total)
            }
            break;
        case 'data':
            document.getElementById('logs').value += ("\nData:" + e.data.data)
    }
};

function send() {
    myWorker.port.postMessage({action : 'workerData', data : document.getElementById('send').value});
    document.getElementById('send').value = ''
}