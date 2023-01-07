const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Follower extends Model {}

Follower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //other users being followed by User
    following_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
//other users that are followers, meaning following User
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "follower",
  }
);

module.exports = Follower;
