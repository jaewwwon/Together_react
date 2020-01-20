const express = require("express");
const db = require("../models");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

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

// 모임 대표이미지 업로드
router.post("/image", upload.array("image"), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

// 모임 갤러리 이미지 불러오기
router.get("/:id/gallery", async (req, res, next) => {
  try {
    const groupId = await db.Group.findOne({ where: { id: req.params.id } });
    if (!groupId) {
      return res.status(404).send("모임이 존재하지 않습니다.");
    }
    let where = {};
    if (parseInt(req.query.lastId, 10)) {
      where = {
        GroupId: req.params.id,
        id: {
          [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
        }
      };
    } else {
      where = {
        GroupId: req.params.id
      };
    }
    const group = await db.Gallery.findAll({
      order: [["id", "DESC"]],
      where,
      limit: parseInt(req.query.limit, 10),
      attributes: ["id", "imagePath"]
    });
    res.json(group);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 갤러리 이미지 업로드
router.post("/:id/gallery", upload.array("image"), async (req, res, next) => {
  const newImages = await Promise.all(
    req.files.map(image => {
      return db.Gallery.create({
        imagePath: image.filename,
        GroupId: req.params.id
      });
    })
  );
  // res.json(req.files.map(v => v.filename));
  res.json(newImages);
});

// 모임 갤러리 이미지 수정
router.patch("/gallery/:id", upload.array("image"), async (req, res, next) => {
  try {
    await Promise.all(
      req.files.map(image => {
        return db.Gallery.update(
          {
            imagePath: image.filename
          },
          {
            where: { id: req.params.id }
          }
        );
      })
    );
    const image = await db.Gallery.findOne({
      where: { id: req.params.id },
      attributes: ["id", "imagePath"]
    });
    return res.json(image);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 갤러리 이미지 삭제
router.delete("/:id/gallery", async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: { id: req.params.id }
    });
    if (!group) {
      return res.status(404).send("모임이 존재하지 않습니다.");
    }
    // await group.removeGallery(req.body.galleryId); // Gallery 테이블의 GroupId 컬럼만 삭제된다.
    await db.Gallery.destroy({ where: { id: req.body.galleryId } }); // 행 전체가 삭제된다.
    res.json(req.body.galleryId);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 생성
router.post("/", async (req, res, next) => {
  try {
    const groupName = await db.Group.findOne({
      where: { groupName: req.body.groupName }
    });
    if (groupName) {
      return res.status(404).send("이미 사용중인 모임 이름 입니다.");
    }
    await db.Group.create({
      groupName: req.body.groupName,
      groupCategory: req.body.groupCategory,
      groupInfo: req.body.groupInfo,
      groupImage: req.body.groupImage,
      UserId: req.user.id
    });
    const group = await db.Group.findOne({
      where: {
        groupName: req.body.groupName
      },
      attributes: [
        "id",
        "groupName",
        "groupCategory",
        "groupInfo",
        "groupImage"
      ]
    });
    res.json(group);
    // return res.status(200).json(newGroup);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

// 모임 정보 수정
router.patch("/:id", async (req, res, next) => {
  try {
    if (req.body.groupImage) {
      await db.Group.update(
        {
          groupImage: req.body.groupImage,
          groupName: req.body.groupName,
          groupInfo: req.body.groupInfo
        },
        {
          where: { id: req.params.id }
        }
      );
    } else {
      await db.Group.update(
        {
          groupName: req.body.groupName,
          groupInfo: req.body.groupInfo
        },
        {
          where: { id: req.params.id }
        }
      );
    }
    const group = await db.Group.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.User,
          through: "Member",
          as: "Members",
          attributes: ["id"]
        }
      ],
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
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// [메인페이지]모든 모임 불어오기
router.get("/", async (req, res, next) => {
  try {
    const groups = await db.Group.findAll({
      order: [["createdAt", "DESC"]], // DESC는 내림차순, ASC는 오름차순
      limit: parseInt(req.query.limit, 10),
      include: [
        {
          model: db.User,
          through: "Member",
          as: "Members",
          attributes: ["id"]
        }
      ]
    });
    res.json(groups);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// [검색페이지]모든 모임 불어오기
router.get("/search", async (req, res, next) => {
  try {
    if (req.query.category && req.query.keyword) {
      // 카테고리 선택과 키워드를 입력한 경우
      let where = {};
      if (parseInt(req.query.lastId, 10)) {
        where = {
          id: {
            [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
          },
          groupCategory: req.query.category,
          groupName: { [Op.like]: `%${req.query.keyword}%` }
        };
      } else {
        where = {
          groupCategory: req.query.category,
          groupName: { [Op.like]: `%${req.query.keyword}%` }
        };
      }
      const groups = await db.Group.findAll({
        where,
        order: [["id", "DESC"]], // DESC는 내림차순, ASC는 오름차순
        include: [
          {
            model: db.User,
            through: "Member",
            as: "Members",
            attributes: ["id"]
          }
        ],
        limit: parseInt(req.query.limit, 10)
      });
      res.json(groups);
    } else if (req.query.category && !req.query.keyword) {
      // 카테고리 선택만 했을 경우
      let where = {};
      if (parseInt(req.query.lastId, 10)) {
        where = {
          id: {
            [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
          },
          groupCategory: req.query.category
        };
      } else {
        where = {
          groupCategory: req.query.category
        };
      }
      const groups = await db.Group.findAll({
        where,
        order: [["id", "DESC"]], // DESC는 내림차순, ASC는 오름차순
        include: [
          {
            model: db.User,
            through: "Member",
            as: "Members",
            attributes: ["id"]
          }
        ],
        limit: parseInt(req.query.limit, 10)
      });
      res.json(groups);
    } else if (!req.query.category && req.query.keyword) {
      // 카테고리를 선택하지 않고, 키워드만 입력했을 경우
      let where = {};
      if (parseInt(req.query.lastId, 10)) {
        where = {
          id: {
            [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
          },
          groupName: { [Op.like]: `%${req.query.keyword}%` }
        };
      } else {
        where = {
          groupName: { [Op.like]: `%${req.query.keyword}%` }
        };
      }
      const groups = await db.Group.findAll({
        where,
        order: [["id", "DESC"]], // DESC는 내림차순, ASC는 오름차순
        include: [
          {
            model: db.User,
            through: "Member",
            as: "Members",
            attributes: ["id"]
          }
        ],
        limit: parseInt(req.query.limit, 10)
      });
      res.json(groups);
    } else {
      // 처음 페이지 로딩시
      let where = {};
      if (parseInt(req.query.lastId, 10)) {
        where = {
          id: {
            [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10) // less than
          }
        };
      }
      const groups = await db.Group.findAll({
        where,
        order: [["id", "DESC"]], // DESC는 내림차순, ASC는 오름차순
        include: [
          {
            model: db.User,
            through: "Member",
            as: "Members",
            attributes: ["id"]
          }
        ],
        limit: parseInt(req.query.limit, 10)
      });
      res.json(groups);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 상세 정보 불러오기
router.get("/:id", async (req, res, next) => {
  try {
    const groupId = await db.Group.findOne({ where: { id: req.params.id } });
    if (!groupId) {
      return res.status(404).send("모임이 존재하지 않습니다.");
    }
    const group = await db.Group.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.User,
          attributes: [
            "id",
            "userEmail",
            "userNickname",
            "userIntro",
            "userProfile"
          ]
        },
        {
          model: db.User,
          through: "Member",
          as: "Members"
          // attributes: ["id"]
        }
      ],
      attributes: [
        "id",
        "groupName",
        "groupCategory",
        "groupInfo",
        "groupImage"
      ]
    });
    res.json(group);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 멤버 가입하기
router.post("/:id/member", async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: { id: req.params.id }
    });
    if (!group) {
      return res.status(404).send("모임이 존재하지 않습니다.");
    }
    await group.addMembers(req.user.id);
    const user = await db.User.findOne({
      where: { id: req.body.userId }
    });
    res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 멤버 탈퇴하기
router.delete("/:id/member", async (req, res, next) => {
  try {
    const group = await db.Group.findOne({
      where: { id: req.params.id }
    });
    if (!group) {
      return res.status(404).send("모임이 존재하지 않습니다.");
    }
    await group.removeMembers(req.user.id);
    res.json(req.user.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
