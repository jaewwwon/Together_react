module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", //-> users
    {
      userEmail: {
        type: DataTypes.STRING(255),
        allowNull: false, // allowNull: null 허용 설정
        unique: true // 고유한 값
      },
      userNickname: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      userPassword: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      userIntro: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      userProfile: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  User.associate = db => {
    db.User.hasMany(db.Schedule);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Group, { as: "Groups" });
    db.User.belongsToMany(db.Group, { through: "Member", as: "Membered" });
    db.User.belongsToMany(db.Schedule, { through: "Attend", as: "Attended" });
  };

  // User.associate = db => {
  //   db.User.hasMany(db.Post, { as: "Posts" }); // as로 테이블명을 구분해줌
  //   db.User.hasMany(db.Comment);
  //   db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" }); //through: 중간 테이블명
  //   db.User.belongsToMany(db.User, {
  //     through: "Follow",
  //     as: "Followers",
  //     foreignKey: "followingId"
  //   });
  //   db.User.belongsToMany(db.User, {
  //     through: "Follow",
  //     as: "Followings",
  //     foreignKey: "followerId"
  //   });
  // };

  // db.Post.belongsTo(db.User); // belongsTo: POST 테이블은 USER테이블에 속해있다. 테이블에 UserId 컬럼이 생긴다.
  // db.Post.hasMany(db.Comment);
  // db.Post.hasMany(db.Image);
  // db.Post.belongsTo(db.Post, { as: "Retweet" }); // RetweetId 컬럼 생겨요
  // db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
  // db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });

  return User;
};

// belongsTo는 해당 테이블에 ID가 생긴다.
// ex) db.User.belongsTo는(db.Comment); -> users 테이블에  commentId 컬럼 생성
// const user = {
//   id: 1,
//   nickname: "jaewon",
//   Liked: [{ 게시글1 }, { 게시글2 }, { 게시글3 }],
//   Followers: [{ 사용자1 }, { 사용자2 }, { 사용자3 }]
// };
