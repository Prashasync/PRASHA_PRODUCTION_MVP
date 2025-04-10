module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("Appointment", {
    user_Id: DataTypes.INTEGER,
    doctorName: DataTypes.STRING,
    time: DataTypes.DATE,
    status: DataTypes.STRING, // confirmed, pending, cancelled
  });
  return Appointment;
};