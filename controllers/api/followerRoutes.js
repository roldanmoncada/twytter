const router = require("express").Router();
const { Follower, User } = require("../../models");
const withAuth = require("../../utils/auth");
//route to create following someone
router.post("/:following", withAuth, async (req, res) => {
  const { following } = req.params;
  const userFolID = req.session.passport.user.user_id;
  const results = await Follower.findOne({
    where: {
      user_id: userFolID,
      following_id: following,
    },
    // user_id: req.session.user_id,
  });
  //if not following yet, create follower
  if (!results) {
    try {
      const followingResult = await Follower.create({
        user_id: userFolID,
        following_id: following,
      });
      res.status(200).json(followingResult);
    } catch (err) {
      console.error("failed to save following: ", err);
      res.status(500).json(err);
    }
  } else {
    res.status(200).json(results);
  }
});
//route to unfollow
router.delete("/:following", withAuth, async (req, res) => {
  try {
    const { following } = req.params;
    const userFolID = req.session.passport.user.user_id;
    const followDelete = await Follower.destroy({
      where: {
        user_id: userFolID,
        following_id: following,
      },
    });
    res.status(200).json(followDelete);
  } catch (err) {
    console.error("failed to save unfollowing: ", err);
    res.status(500).json(err);
  }
});

module.exports = router;
