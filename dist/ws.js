"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_router_1 = __importDefault(require("koa-router"));
var koa_websocket_1 = __importDefault(require("koa-websocket"));
var app = koa_websocket_1.default(new koa_1.default());
var router = new koa_router_1.default();
app.ws.use(function (ctx, next) {
    return next(ctx);
});
var clients = new Set();
router.all('/test/:id', function (ctx) {
    clients.add(ctx.websocket);
    // console.log(ctx)
    // `ctx` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `ctx.websocket`.
    ctx.websocket.send('Hello World');
    ctx.websocket.on('message', function (message) {
        // do something with the message from client
        console.log(message);
    });
});
setTimeout(function () {
    console.log("OK", __spreadArray([], clients).length, JSON.stringify(clients));
    __spreadArray([], clients).forEach(function (client) {
        console.log("OK", JSON.stringify(client));
        //     console.log('websocket',client.websocket)
        client.send(JSON.stringify(client));
    });
}, 5000);
app.ws.use(router.routes());
app.listen(3001);
//# sourceMappingURL=ws.js.map