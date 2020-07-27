const { OAuth } = require("./oauth");
const { errorHandler } = require("./error.handler");

const oauth = new OAuth();

module.exports = { oauth, errorHandler };
