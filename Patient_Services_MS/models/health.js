module.exports = (sequelize, DataTypes) => {
  const Health = sequelize.define("Health", {
    user_Id: DataTypes.INTEGER,
    sleepHours: DataTypes.FLOAT,
    energyLevel: DataTypes.INTEGER,
  });
  return Health;
};