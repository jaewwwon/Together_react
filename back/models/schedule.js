module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  Schedule.associate = db => {
    db.Schedule.belongsTo(db.Group);
    db.Schedule.belongsTo(db.User);
    db.Schedule.belongsToMany(db.User, { through: "Attend", as: "Attends" });
  };
  return Schedule;
};
