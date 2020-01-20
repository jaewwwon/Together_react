const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const db = require("../models");

const router = express.Router();

// 이미지 업로드
const upload = multer({
  storage: multer.diskStorage({
    //경로 설정
    destination(req, file, done) {
      done(null, "uploads");
    },
    // 파일명 설정
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }
});

// 사용자 프로필 업로드
router.post("/profile", upload.array("image"), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

// 회원가입
router.post("/signup", async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        userEmail: req.body.userEmail
      }
    });
    // console.log(exUser);
    if (exUser) {
      return res.status(403).send("이미 가입된 이메일입니다.");
    }
    // 비밀번호 암호화. salt는 10~13 사이로 설정한다.
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 12);
    const newUser = await db.User.create({
      userEmail: req.body.userEmail,
      userNickname: req.body.userNickname,
      userPassword: hashedPassword
    });
    // console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

// 회원탈퇴
router.delete("/leave/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) }
    });

    // 비밀번호가 일치하는지 확인한다.
    const result = await bcrypt.compare(
      req.body.userPassword,
      user.userPassword
    );

    if (!result) {
      return res.status(401).send("비밀번호가 일치하지 않습니다.");
    }

    await db.User.destroy({ where: { id: req.user.id } });

    req.logout();
    req.session.destroy();
    res.send("logout 성공");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 로그인 회원 정보 불러오기
router.get("/", (req, res) => {
  // /api/user/
  if (!req.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }
  const user = Object.assign({}, req.user.toJSON());
  delete user.password;
  return res.json(user);
});

// 가입한 회원 정보 불러오기
router.get("/:id", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      attributes: [
        "id",
        "userEmail",
        "userNickname",
        "userIntro",
        "userProfile"
      ]
    });

    const jsonUser = user.toJSON();
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    if (req.body.userPassword) {
      //비밀번호 암호화
      const hashedPassword = await bcrypt.hash(req.body.userPassword, 12);
      await db.User.update(
        {
          userNickname: req.body.userNickname,
          userIntro: req.body.userIntro,
          userProfile: req.body.userProfile,
          userPassword: hashedPassword
        },
        {
          where: { id: req.user.id }
        }
      );
      return res.status(200).json(result);
    } else {
      await db.User.update(
        {
          userNickname: req.body.userNickname,
          userIntro: req.body.userIntro,
          userProfile: req.body.userProfile
        },
        {
          where: { id: req.user.id }
        }
      );
    }
    const user = await db.User.findOne({
      where: { id: parseInt(req.user.id, 10) },
      attributes: [
        "id",
        "userEmail",
        "userNickname",
        "userIntro",
        "userProfile"
      ]
    });

    const jsonUser = user.toJSON();
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 로그아웃
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("logout 성공");
});

// 로그인
router.post("/login", (req, res, next) => {
  // LocalStrategy
  passport.authenticate("local", (err, user, info) => {
    console.log(err, user, info);
    // err, user, info -> passport의 done(1, 2, 3)번째 인자들
    // 서버 에러인 경우
    if (err) {
      console.error(err);
      return next(err);
    }
    // 로직상 에러인 경우
    if (info) {
      return res.status(401).send(info.reason);
    }

    // 서버와 로직상 에러가 없을 경우 로그인을 진행한다
    // req.login시에 passport의 serializeUser가 실행된다
    return req.login(user, async loginErr => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { userEmail: user.userEmail },
          attributes: [
            "id",
            "userEmail",
            "userNickname",
            "userIntro",
            "userProfile"
          ]
        });
        console.log(fullUser);
        return res.json(fullUser);
        // return res.redirect('/users/' + req.user.username);
      } catch (e) {
        next(e);
      }
    });
  })(req, res, next);
});

// 생성한 모임 리스트 불러오기
router.get("/group/create", async (req, res) => {
  if (!req.user) {
    return res.status(401).send("로그인이 필요합니다.");
  }
  const group = await db.Group.findAndCountAll({
    where: {
      UserId: req.user.id
    },
    include: [
      {
        model: db.User,
        through: "Member",
        as: "Members",
        attributes: ["id"]
      }
    ],
    limit: parseInt(req.query.limit, 10),
    offset: parseInt(req.query.offset, 10),
    attributes: [
      "id",
      "groupName",
      "groupCategory",
      "groupInfo",
      "groupImage",
      "createdAt"
    ]
  });
  return res.json(group);
});

// 가입한 모임 리스트 불러오기
router.get("/group/join", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }
    const group = await db.Group.findAndCountAll({
      include: [
        {
          model: db.User,
          attributes: ["userNickname"]
        },
        {
          model: db.User,
          through: "Member",
          as: "Members",
          where: {
            id: req.user.id
          },
          attributes: ["id", "createdAt"]
        }
      ],
      limit: parseInt(req.query.limit, 10),
      offset: parseInt(req.query.offset, 10),
      attributes: ["id", "groupName", "groupCategory", "createdAt"]
    });
    return res.json(group);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
