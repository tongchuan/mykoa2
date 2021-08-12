import Koa from 'koa';
import Router from 'koa-router';
import websocket from 'koa-websocket';

const app = websocket(new Koa());
const router = new Router();
// const clients = new Set<websocket.MiddlewareContext<Koa.DefaultState> & Koa.DefaultContext>();
const clients = []
app.ws.use((ctx, next) => {
  // clients.push(ctx);
  // console.log(ctx)
  return next(ctx);
});

// app.ws.use((ctx, next) => {
//   clients.add(ctx);
//   return next();
// });

router.all('/test/:id', (ctx: any) => {

  // console.log(ctx.websocket)
  clients.push(ctx.websocket)
  // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
  // the websocket is added to the context on `ctx.websocket`.
  ctx.websocket.send('Hello World');
  ctx.websocket.on('message', (message: any) => {
    // do something with the message from client
    console.log(message);
  });
});


setTimeout(() => {
  // console.log('OK', clients.length, JSON.stringify(clients));
  clients.forEach((client) => {
    client.send('OK');
    // console.log('OK', JSON.stringify(client));
  //   //     console.log('websocket',client.websocket)
  //   client.send(JSON.stringify(client));
  });
}, 5000);
app.ws.use((router as any).routes()).use((router as any).allowedMethods());
app.listen(3001);