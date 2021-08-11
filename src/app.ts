import fs from 'fs';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import KoaStatic from 'koa-static';
import BodyParser from 'koa-bodyparser';
import mine from 'mime-types';

const app = new Koa();
const router = new Router();
// const bodyparser = new ;
app.use(BodyParser());
app.use(KoaStatic(path.join(__dirname, '../public')));

router.all('/', async(ctx: any) => {
  ctx.res.writeHead(301, {Location: '/test'});
  // ctx.end();
  ctx.type = 'html';
  ctx.body = '<h1>Hello World!</h1>';
});


router.all('/image', async(ctx: any) => {
  const filename = path.join(__dirname, '../public/20160713003239.png');
  const data = fs.readFileSync('public/20160713003239.png');
  const mimeType = mine.lookup(filename);
  console.log(mimeType);
  ctx.set('content-type', mimeType);
  ctx.body = data;
});

router.all('/down', async(ctx: any) => {
  console.log(ctx.request.params);
  const data = fs.readFileSync('public/事项会计-凭证模版.xlsm');
  ctx.set('Content-Type', 'application/vnd.openxmlformats');
  ctx.set('Content-Disposition', 'attachment; filename=' + 'user.xlsx');
  ctx.body = data;
});

router.all('/test', async(ctx: any) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
  ctx.type = 'html';
  ctx.body = '<h1>Hello World test!</h1>';
});

router.all('/test1', async(ctx: any) => {
  ctx.type = 'html';
  ctx.body = '<h1>Hello World test!</h1>';
});

app.use(router.routes());

// app.on('error', (error, ctx)=>{
//   console.log(error);
//   ctx.body = "error";
// })

// app.use(ctx => {
//   ctx.body = 'Hello world!!!';
// });
export default app;
// module.exports = app;