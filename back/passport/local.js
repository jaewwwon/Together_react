const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "userEmail", //req.body.userEmail
        passwordField: "userPassword" //req.body.userPassword
      },
      async (userEmail, userPassword, done) => {
        try {
          // 사용자가 있는지 찾는다
          const user = await db.User.findOne({ where: { userEmail } });
          if (!user) {
            //done(서버쪽 에러: 1/null, 성공했을때, 로직상에러가날때)
            return done(null, false, { reason: "가입되지 않은 이메일입니다." });
          }
          // 비밀번호가 일치하는지 확인한다.
          const result = await bcrypt.compare(userPassword, user.userPassword);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 일치하지 않습니다." });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
