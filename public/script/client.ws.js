console.log("ok")

const ws = new WebSocket('ws://127.0.0.1:3001/test/333');

    ws.onopen = () => {
        console.log('WebSocket onopen');
        ws.send("链接后第一次发送")
    }

    ws.onmessage = e => {
        console.log('WebSocket onmessage');
        console.log('WebSocket message received：', e);
        console.log('WebSocket data received：', e.data);
    }

    ws.onclose = e => {
        console.log("WebSocket onclose");
    };
