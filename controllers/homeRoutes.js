const router = require("express").Router();
const { User, Follower, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    // I think it would make more sense to have this here instead of the /login route. Because having it here will make it effectively impossible for the session to be logged in when accessing the /login endpoint.
    if (!req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("homeroutes");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, their request is redirected to their dashboard page.
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  // rendering the login.handlebars file if the user is not logged in.
  res.render("login");
});

module.exports = router;
