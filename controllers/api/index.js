const router = require("express").Router();
// PLACEHOLDER FOR THE CONSTS IN WHICH WE'RE STORING THE REQUIRED API ROUTES

// PLACEHOLDER FOR THE ROUTER.USE LINES OF CODE

const userRoutes = require("./user-api");
const postRoutes = require("./post-api");
const commentRoutes = require("./comment-api");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
