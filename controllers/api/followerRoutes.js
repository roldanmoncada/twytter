const router = require("express").Router();
const { Follower, User } = require("../../models");
const withAuth = require("../../utils/auth");
//route create a follower
router.post("/:following", withAuth, async (req, res) => {
  const { following } = req.params;
  const userFolID = req.session.user_id;
  const results = await Follower.findOne({
    where: {
      user_id: userFolID,
      following_id: following,
    },
    // user_id: req.session.user_id,
  });
  //if not following yet, create follower
  if (!results) {
    const following = Follower.create({
      user_id: userFolID,
      following_id: following,
    })
    res.json(results);
  }
});
//route to unfollow
router.delete("/:following", withAuth, async (req, res) => {
  try {
    const unfollow = await Follower.destroy({
      where: {
        user_id: userFolID,
        following_id: following,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
