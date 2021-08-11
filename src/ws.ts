import Koa from 'koa';
import Router from 'koa-router';
import websocket from 'koa-websocket';

const app = websocket(new Koa());
const router = new Router();
app.ws.use((ctx, next) => {
    return next(ctx);
});
let clients = new Set()
router.all('/test/:id', (ctx) => {
    clients.add(ctx.websocket)
    // console.log(ctx)
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Hello World');
    ctx.websocket.on('message', (message: any) => {
        // do something with the message from client
            console.log(message);
    });
});


    setTimeout(()=>{
        console.log("OK",[...clients].length,JSON.stringify(clients));
        [...clients].forEach((client)=>{
            console.log("OK",JSON.stringify(client));
        //     console.log('websocket',client.websocket)
            client.send(JSON.stringify(client))
        })
    }, 5000);

app.ws.use(router.routes());
app.listen(3001);