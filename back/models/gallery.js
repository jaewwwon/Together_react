module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define(
    "Gallery",
    {
      imagePath: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );
  Gallery.associate = db => {
    db.Gallery.belongsTo(db.Group);
  };
  return Gallery;
};
