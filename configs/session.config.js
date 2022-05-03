const session = require("express-session");
const SessionStore = require("connect-session-sequelize")(session.Store);
const utopiaDB = require("../utils/db.util");

const utopiaSessionStore = new SessionStore({
  db: utopiaDB,
  // table: "user_sessions",
});

function sessionConfig(app) {
  app.use(
    session({
      secret: "demo-secret",
      store: utopiaSessionStore,
      resave: false,
      saveUninitialized: false,
    })
  );
}

module.exports = {
  sessionConfig: sessionConfig,
  sessionStore: utopiaSessionStore,
};
