const User = require("./User");
const Blog = require("./Post");
const Comment = require("./Comment");
const Follower = require("./Follower");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

 
User.hasMany(Follower, {
  as: "following",
  foreignKey: "user_id",
});
User.hasMany(Follower, {
  as: "followers",
  foreignKey: "following_id",
});

//or 
 
 
module.exports = { User, Post, Comment, Follower };
