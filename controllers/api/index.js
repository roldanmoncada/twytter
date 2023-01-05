const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const followerRoutes = require("./followerRoutes");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/followers", followerRoutes);

// PLACEHOLDER FOR THE CONSTS IN WHICH WE'RE STORING THE REQUIRED API ROUTES

// PLACEHOLDER FOR THE ROUTER.USE LINES OF CODE

module.exports = router;
