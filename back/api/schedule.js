const express = require("express");
const db = require("../models");
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

// [메인] 일정 불러오기
router.get("/", async (req, res, next) => {
  try {
    const schedule = await db.Schedule.findAll({
      order: [["date", "DESC"]],
      include: [
        {
          model: db.User,
          through: "Attend",
          as: "Attends",
          attributes: ["id", "userNickname", "userIntro", "userProfile"]
        },
        {
          model: db.Group,
          attributes: ["groupCategory"]
        }
      ],
      attributes: ["id", "title", "content", "date", "location", "GroupId"]
    });
    res.json(schedule);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

// [검색페이지] 전체 일정 불러오기
router.get("/search", async (req, res, next) => {
  try {
    // 카테고리를 선택하지 않고, 키워드만 입력했을 경우
    if (!req.query.category && req.query.keyword) {
      let where = {};
      if (req.query.lastDate) {
        where = {
          date: {
            [db.Sequelize.Op.lt]: new Date(req.query.lastDate) // less than
          },
          [Op.or]: [
            { title: { [Op.like]: `%${req.query.keyword}%` } },
            { content: { [Op.like]: `%${req.query.keyword}%` } }
          ]
        };
      } else {
        where = {
          [Op.or]: [
            { title: { [Op.like]: `%${req.query.keyword}%` } },
            { content: { [Op.like]: `%${req.query.keyword}%` } }
          ]
        };
      }
      const schedule = await db.Schedule.findAll({
        order: [["date", "DESC"]],
        where,
        include: [
          {
            model: db.User,
            through: "Attend",
            as: "Attends",
            attributes: ["id", "userNickname", "userIntro", "userProfile"]
          },
          {
            model: db.Group,
            attributes: ["groupCategory"]
          }
        ],
        attributes: ["id", "title", "content", "date", "location", "GroupId"],
        limit: parseInt(req.query.limit, 10)
      });
      res.json(schedule);
    } else if (req.query.category && req.query.keyword) {
      // 카테고리 선택과 키워드 입력을 모두 했을 경우
      let where = {};
      if (req.query.lastDate) {
        where = {
          date: {
            [db.Sequelize.Op.lt]: new Date(req.query.lastDate) // less than
          },
          [Op.or]: [
            { title: { [Op.like]: `%${req.query.keyword}%` } },
            { content: { [Op.like]: `%${req.query.keyword}%` } }
          ]
        };
      } else {
        where = {
          [Op.or]: [
            { title: { [Op.like]: `%${req.query.keyword}%` } },
            { content: { [Op.like]: `%${req.query.keyword}%` } }
          ]
        };
      }
      const schedule = await db.Schedule.findAll({
        order: [["date", "DESC"]],
        where,
        include: [
          {
            model: db.User,
            through: "Attend",
            as: "Attends",
            attributes: ["id", "userNickname", "userIntro", "userProfile"]
          },
          {
            model: db.Group,
            where: {
              groupCategory: req.query.category
            },
            attributes: ["groupCategory"]
          }
        ],
        attributes: ["id", "title", "content", "date", "location", "GroupId"],
        limit: parseInt(req.query.limit, 10)
      });
      res.json(schedule);
    } else if (req.query.category && !req.query.keyword) {
      // 카테고리를 선택하고 키워드를 입력하지 않았을 경우
      let where = {};
      if (req.query.lastDate) {
        where = {
          date: {
            [db.Sequelize.Op.lt]: new Date(req.query.lastDate) // less than
          }
        };
      }
      const schedule = await db.Schedule.findAll({
        order: [["date", "DESC"]],
        where,
        include: [
          {
            model: db.User,
            through: "Attend",
            as: "Attends",
            attributes: ["id", "userNickname", "userIntro", "userProfile"]
          },
          {
            model: db.Group,
            where: {
              groupCategory: req.query.category
            },
            attributes: ["groupCategory"]
          }
        ],
        attributes: ["id", "title", "content", "date", "location", "GroupId"],
        limit: parseInt(req.query.limit, 10)
      });
      res.json(schedule);
    } else {
      // 처음 페이지 로딩시
      let where = {};
      if (req.query.lastDate) {
        where = {
          date: {
            [db.Sequelize.Op.lt]: new Date(req.query.lastDate) // less than
          }
        };
      }
      const schedule = await db.Schedule.findAll({
        where,
        order: [["date", "DESC"]],
        include: [
          {
            model: db.User,
            through: "Attend",
            as: "Attends",
            attributes: ["id", "userNickname", "userIntro", "userProfile"]
          },
          {
            model: db.Group,
            attributes: ["groupCategory"]
          }
        ],
        attributes: ["id", "title", "content", "date", "location", "GroupId"],
        limit: parseInt(req.query.limit, 10)
      });
      res.json(schedule);
    }
    // return res.status(200).json(newGroup);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

// 모임 일정 불러오기
router.get("/:id", async (req, res, next) => {
  try {
    let where = {};
    if (req.query.lastDate) {
      where = {
        GroupId: req.params.id,
        date: {
          [db.Sequelize.Op.lt]: new Date(req.query.lastDate) // less than
        }
      };
    } else {
      where = {
        GroupId: req.params.id
      };
    }
    const schedule = await db.Schedule.findAll({
      where,
      order: [["date", "DESC"]],
      include: [
        {
          model: db.User,
          through: "Attend",
          as: "Attends",
          attributes: ["id", "userNickname", "userIntro", "userProfile"]
        }
      ],
      attributes: ["id", "title", "content", "date", "location"],
      limit: parseInt(req.query.limit, 10)
    });
    res.json(schedule);
    // return res.status(200).json(newGroup);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

// 모임 일정 생성
router.post("/", async (req, res, next) => {
  try {
    if (!req.user.id) {
      return res.status(404).send("로그인이 필요합니다.");
    }
    const newSchedule = await db.Schedule.create({
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
      location: req.body.location,
      UserId: req.user.id,
      GroupId: req.body.groupId
    });
    const schedule = await db.Schedule.findOne({
      where: {
        id: newSchedule.id
      },
      include: [
        {
          model: db.User,
          through: "Attend",
          as: "Attends",
          attributes: ["id", "userNickname", "userIntro", "userProfile"]
        }
      ],
      attributes: ["id", "title", "content", "date", "location"]
    });
    res.json(schedule);
    // return res.status(200).json(newGroup);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

// 모임 일정 수정
router.patch("/:id", async (req, res, next) => {
  try {
    await db.Schedule.update(
      {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        location: req.body.location
      },
      {
        where: { id: req.params.id }
      }
    );
    const schedule = await db.Schedule.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.User,
          through: "Attend",
          as: "Attends",
          attributes: ["id", "userNickname", "userIntro", "userProfile"]
        }
      ],
      attributes: ["id", "title", "content", "date", "location"]
    });
    return res.json(schedule);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 일정 삭제
router.delete("/:id", async (req, res, next) => {
  try {
    await db.Schedule.destroy({ where: { id: req.params.id } });
    res.json(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 일정 참석
router.post("/:id/member", async (req, res, next) => {
  try {
    const schedule = await db.Schedule.findOne({
      where: { id: req.params.id }
    });
    if (!schedule) {
      return res.status(404).send("일정이 존재하지 않습니다.");
    }
    await schedule.addAttends(req.user.id);
    const user = await db.User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "userNickname", "userIntro", "userProfile"]
    });
    res.json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임 일정 참석 취소
router.delete("/:id/member", async (req, res, next) => {
  try {
    const schedule = await db.Schedule.findOne({
      where: { id: req.params.id }
    });
    if (!schedule) {
      return res.status(404).send("일정이 존재하지 않습니다.");
    }
    await schedule.removeAttends(req.user.id);
    res.json(req.user.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
