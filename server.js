const express = require("express");
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const path = require("path");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

passport.use(new LocalStrategy( async (username, password, cb) => {
  const user = await User.findOne({
    where: {
      username
    }
  }); 

    // if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.'}); }
 
    if (!user.checkPassword(password)) { return cb(null, false, { message: 'Incorrect username or password.'}); }
      
    return cb(null, user);
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cd(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

app.use(passport.session());

// const sess = {
//   secret: 'the fly is in the ointment',
//   resave: false,
//   saveUninitialized: false,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// // const sess = {
// //   secret: "Super secret secret",
// //   cookie: {},
// //   resave: false,
// //   saveUninitialized: true,
// //   store: new SequelizeStore({
// //     db: sequelize,
// //   }),
// // };

// app.use(session(sess));
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
