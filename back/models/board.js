module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      category: {
        type: DataTypes.STRING(10),
        allowNull: false // allowNull: null 허용 설정
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      view: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  Board.associate = db => {
    db.Board.hasMany(db.Comment);
    db.Board.belongsTo(db.User);
    db.Board.belongsTo(db.Group);
  };

  return Board;
};
