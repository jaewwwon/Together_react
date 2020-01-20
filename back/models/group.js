module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group", //-> users
    {
      groupName: {
        type: DataTypes.STRING(255),
        allowNull: false, // allowNull: null 허용 설정
        unique: true // 고유한 값
      },
      groupCategory: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      groupInfo: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      groupImage: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  Group.associate = db => {
    db.Group.hasMany(db.Gallery);
    db.Group.hasMany(db.Schedule);
    db.Group.belongsTo(db.User);
    db.Group.belongsToMany(db.User, { through: "Member", as: "Members" });
  };

  return Group;
};
