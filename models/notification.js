module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    user_Id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Notification;
};