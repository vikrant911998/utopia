const session = require("express-session");
const SessionStore = require("connect-session-sequelize")(session.Store);
const utopiaDB = require("../utils/db.util");

const SESSION_EXPIRATION_TIME = 60 * 100;

const utopiaSessionStore = new SessionStore({
  db: utopiaDB,
  expiration: SESSION_EXPIRATION_TIME,
});

function sessionConfig(app) {
  app.use(
    session({
      secret: "demo-secret",
      store: utopiaSessionStore,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: SESSION_EXPIRATION_TIME },
    })
  );
}

module.exports = {
  sessionConfig: sessionConfig,
  sessionStore: utopiaSessionStore,
};
