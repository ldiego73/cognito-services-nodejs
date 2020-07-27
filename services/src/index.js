const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const log = require("fancy-log");

const { errorHandler, oauth } = require("./core");
const { router } = require("./routes");

const app = new Koa();

app
  .use(cors())
  .use(koaBody())
  .use(errorHandler)
  .use(router.routes())
  .use(router.allowedMethods());

function start() {
  app.listen(3000, async () => {
    log.info("Server listen into PORT 3000");
  });
}

start();
