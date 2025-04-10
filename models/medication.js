module.exports = (sequelize, DataTypes) => {
  const Medication = sequelize.define("Medication", {
    user_Id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    dosage: DataTypes.STRING,
    time: DataTypes.STRING,
  });
  return Medication;
};