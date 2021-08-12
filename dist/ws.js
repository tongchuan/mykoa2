"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var koa_websocket_1 = __importDefault(require("koa-websocket"));
var app = koa_websocket_1.default(new koa_1.default());
var router = new koa_router_1.default();
// const clients = new Set<websocket.MiddlewareContext<Koa.DefaultState> & Koa.DefaultContext>();
var clients = [];
app.ws.use(function (ctx, next) {
    // clients.push(ctx);
    // console.log(ctx)
    return next(ctx);
});
// app.ws.use((ctx, next) => {
//   clients.add(ctx);
//   return next();
// });
router.all('/test/:id', function (ctx) {
    // console.log(ctx.websocket)
    clients.push(ctx.websocket);
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Hello World');
    ctx.websocket.on('message', function (message) {
        // do something with the message from client
        console.log(message);
    });
});
setTimeout(function () {
    // console.log('OK', clients.length, JSON.stringify(clients));
    clients.forEach(function (client) {
        client.send('OK');
        // console.log('OK', JSON.stringify(client));
        //   //     console.log('websocket',client.websocket)
        //   client.send(JSON.stringify(client));
    });
}, 5000);
app.ws.use(router.routes()).use(router.allowedMethods());
app.listen(3001);
//# sourceMappingURL=ws.js.map