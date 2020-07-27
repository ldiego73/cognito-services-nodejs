const { oauth } = require("../core");

const authorize = async (ctx) => {
  const { authorization } = ctx.request.headers;
  ctx.body = await oauth.authorize(authorization);
}

module.exports = { authorize };
