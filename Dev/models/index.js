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

User.belongsToMany(Follower, {
  as: "Followers",
  foreignKey: "Following_Id",
});
Follower.belongsToMany(User, {
  as: "Following",
  foreignKey: "Follower_Id",
});
 
module.exports = { User, Post, Comment, Follower };
