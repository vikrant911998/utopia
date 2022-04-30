const winston = require('winston');
const expressWinston = require('express-winston');

const loggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
      winston.format.json(),
      winston.format.prettyPrint(),
      winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

function loggerConfig(app) {
  app.use(expressWinston.logger(loggerOptions));
}

module.exports = loggerConfig;