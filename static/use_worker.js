const myWorker = new SharedWorker("/worker.js");

myWorker.port.onmessage = (e) => {
    // result1.textContent = e.data;
    console.log("Message received from worker", e);
    let [type, ...params] = e.data
    console.log(type, params)
    switch(type){
        case 'total':
            let total = params[0]
            if(document.getElementById('text')){
                document.getElementById('text').innerHTML = total
            }else{
                document.getElementById('logs').value += ("\nTổng số kết nối hiện tại" + total)
            }
            break;
        case 'data':
            document.getElementById('logs').value += ("\nData:" + total)
    }
};

function send() {
    myWorker.port.postMessage(['workerData', document.getElementById('send').value]);
    document.getElementById('send').value = ''
}