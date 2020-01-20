const passport = require("passport");
const db = require("../models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    //서버쪽에 [{id: 3, cookie: 'asfsd'}] 같은 배열을 저장한다
    //서버에 id만 저장됨
    //그럼 id 정보만 알 수 있기 때문에 deserializeUser로 id에 관련된 정보를 불러온다
    return done(null, user.userEmail);
  });

  passport.deserializeUser(async (userEmail, done) => {
    try {
      const user = await db.User.findOne({
        where: { userEmail }
        // include: [
        //   {
        //     model: db.Post,
        //     as: "Posts",
        //     attributes: ["userEmail"]
        //   }
        // ]
      });
      return done(null, user); // req.user
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};

// 프론트에서 서버로는 cookie만 보내요(asdfgh)
// 서버가 쿠키파서, 익스프레스 세션으로 쿠키 검사 후 id: 3 발견
// id: 3이 deserializeUser에 들어감
// req.user로 사용자 정보가 들어감

// 요청 보낼때마다 deserializeUser가 실행됨(db 요청 1번씩 실행)
// 실무에서는 deserializeUser 결과물 캐싱
