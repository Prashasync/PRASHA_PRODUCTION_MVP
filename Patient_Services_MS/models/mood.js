module.exports = (sequelize, DataTypes) => {
  const Mood = sequelize.define("Mood", {
    user_Id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    note: DataTypes.STRING,
  });
  return Mood;
};