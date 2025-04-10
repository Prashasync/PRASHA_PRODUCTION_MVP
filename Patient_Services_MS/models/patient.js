module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("patients", {
    patient_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE,
    },
    language: {
      type: DataTypes.STRING,
    },
    religion: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    health_score: {
      type: DataTypes.INTEGER,
    },
    // ✅ Your additional columns for your functionality
    gender: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    isOnboarded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    onboardingCompletedAt: {
      type: DataTypes.DATE,
    },
    timezone: {
      type: DataTypes.STRING,
    },
    preferences: {
      type: DataTypes.JSONB,
      defaultValue: {},
    },
  }, {
    timestamps: false, // No createdAt/updatedAt in your existing table
    freezeTableName: true, // Keep table name as 'patients' (no pluralization)
  });

  return Patient;
};

