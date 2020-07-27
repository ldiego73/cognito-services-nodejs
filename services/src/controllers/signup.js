const { oauth } = require("../core");

const signUp = async (ctx) => {
  const { username, password, email, phoneNumber } = ctx.request.body;
  ctx.body = await oauth.signUp({ username, password, email, phoneNumber });
};

module.exports = { signUp };
