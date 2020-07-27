const { oauth } = require("../core");

const authenticate = async (ctx) => {
  const { username, password } = ctx.request.body;
  ctx.body = await oauth.authenticate(username, password);
};

module.exports = { authenticate };
