"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require('babel-register');
// const app = require('./app.ts');
// import 'babel-register';
var cluster_1 = __importDefault(require("cluster"));
var os_1 = require("os");
var process_1 = __importDefault(require("process"));
var app_1 = __importDefault(require("./app"));
var numCPUs = os_1.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log("Primary " + process_1.default.pid + " is running");
    for (var i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    console.log(numCPUs);
}
else {
    console.log("Worker " + process_1.default.pid + " started");
}
var server = app_1.default.listen(3000, function () {
    console.log('Server is running at http://localhost:3000');
    console.log('Press CTRL-C to stop \n');
});
module.exports = server;
//# sourceMappingURL=server.js.map