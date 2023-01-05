const router = require("express").Router();
const { Follower, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/:following", withAuth, async (req, res) => {
  const { following } = req.params;
  const results = await Follower.create({
    user_id: 1,
    // user_id: req.session.user_id,
    following_id: following,
  });
  res.json(results);
});

module.exports = router;
