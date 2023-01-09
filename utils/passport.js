module.exports = function (passport, user) {
  var User = user;
  var LocalStrategy = require("passport-local").Strategy;
  const process = require("process");
  //serialize
  passport.serializeUser(function (user, done) {
    done(null, user.id);
    process.nextTick(function () {
      return done(null, {
        user_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        logged_in: true,
      });
    });
  });

  // deserialize user
  passport.deserializeUser(function (user, done) {
    console.log("deserializing user: ", user);
    User.findByPk(user.user_id).then(function (user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null); // sometimes causes an error?? switching it to null, user.error has worked but then also switching it back makes it work again??
      }
    });
  });

  //Signup passport
  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      function (req, email, password, done) {
        User.findOne({
          where: {
            email,
          },
        }).then(function (user) {
          if (user) {
            return done(null, false, {
              message: "That email is already taken.",
            });
          } else {
            var data = {
              email,
              password,
              username: req.body.username,
              first_name: req.body.first_name,
              last_name: req.body.last_name,
            };
            User.create(data).then(function (newUser, created) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  //Login passport
  passport.use(
    "login",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we can override them
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      function (req, email, password, done) {
        var User = user;
        User.findOne({
          where: {
            email,
          },
        })
          .then(function (user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist",
              });
            }
            const validPassword = user.checkPassword(password);

            if (!validPassword) {
              return done(null, false, {
                message: "Incorrect password.",
              });
            }
            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function (err) {
            console.log("Error in Login passport:", err);

            return done(null, false, {
              message: "Something went wrong with your Login.",
            });
          });
      }
    )
  );
};
