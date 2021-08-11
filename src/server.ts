// require('babel-register');
// const app = require('./app.ts');
// import 'babel-register';
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import app from './app';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  console.log(numCPUs);
} else {
  console.log(`Worker ${process.pid} started`);
}

const server = app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
  console.log('Press CTRL-C to stop \n');
});

module.exports = server;