const express = require("express");
const db = require("../models");
const router = express.Router();
const sequelize = require("sequelize");
const Op = sequelize.Op;

// 게시글 쓰기
router.post("/", async (req, res, next) => {
  try {
    const newBoard = await db.Board.create({
      category: req.body.category,
      title: req.body.title,
      content: req.body.content,
      view: 0,
      UserId: req.user.id,
      GroupId: req.body.groupId
    });
    // console.log(newBoard);
    return res.status(200).json(newBoard);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

// 게시글 수정
router.patch("/", async (req, res, next) => {
  try {
    db.Board.update(
      {
        category: req.body.category,
        title: req.body.title,
        content: req.body.content
      },
      {
        where: { id: req.body.id }
      }
    );
    return res.json({
      id: req.body.id,
      category: req.body.category,
      title: req.body.title
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 게시글 삭제
router.delete("/:id", async (req, res, next) => {
  try {
    await db.Board.destroy({ where: { id: req.params.id } }); // 행 전체가 삭제된다.
    res.json(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임의 게시판 목록 불러오기
router.get("/list/:id", async (req, res, next) => {
  try {
    const groupId = await db.Group.findOne({ where: { id: req.params.id } });
    if (!groupId) {
      return res.status(404).send("모임이 존재하지 않습니다.");
    }
    if (req.query.category == "all" && req.query.keyword) {
      const board = await db.Board.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
          GroupId: req.params.id,
          [Op.or]: [
            { title: { [Op.like]: `%${req.query.keyword}%` } },
            { content: { [Op.like]: `%${req.query.keyword}%` } }
          ]
        },
        include: [
          {
            model: db.User,
            attributes: ["userNickname"]
          }
        ],
        attributes: ["id", "category", "title", "view", "createdAt"],
        limit: parseInt(req.query.limit, 10),
        offset: parseInt(req.query.offset, 10)
      });
      res.json(board);
    } else if (req.query.category && !req.query.keyword) {
      const board = await db.Board.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
          GroupId: req.params.id,
          category: req.query.category
        },
        include: [
          {
            model: db.User,
            attributes: ["userNickname"]
          }
        ],
        attributes: ["id", "category", "title", "view", "createdAt"],
        limit: parseInt(req.query.limit, 10),
        offset: parseInt(req.query.offset, 10)
      });
      res.json(board);
    } else if (req.query.category && req.query.keyword) {
      const board = await db.Board.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
          GroupId: req.params.id,
          category: req.query.category,
          [Op.or]: [
            { title: { [Op.like]: `%${req.query.keyword}%` } },
            { content: { [Op.like]: `%${req.query.keyword}%` } }
          ]
        },
        include: [
          {
            model: db.User,
            attributes: ["userNickname"]
          }
        ],
        attributes: ["id", "category", "title", "view", "createdAt"],
        limit: parseInt(req.query.limit, 10),
        offset: parseInt(req.query.offset, 10)
      });
      res.json(board);
    } else {
      const board = await db.Board.findAndCountAll({
        order: [["id", "DESC"]],
        where: {
          GroupId: req.params.id
        },
        include: [
          {
            model: db.User,
            attributes: ["userNickname"]
          }
        ],
        attributes: ["id", "category", "title", "view", "createdAt"],
        limit: parseInt(req.query.limit, 10),
        offset: parseInt(req.query.offset, 10)
      });
      res.json(board);
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 모임의 게시판 페이지네이션
// router.get("/:id/pagination", async (req, res, next) => {
//   try {
//     const groupId = await db.Group.findOne({ where: { id: req.params.id } });
//     if (!groupId) {
//       return res.status(404).send("모임이 존재하지 않습니다.");
//     }
//     const board = await db.Board.findAll({
//       order: [["createdAt", "DESC"]],
//       where: {
//         GroupId: req.params.id
//       },
//       limit: parseInt(req.query.limit, 10),
//       offset: parseInt(req.query.offset, 10),
//       attributes: ["id", "imagePath"]
//     });
//     res.json(group);
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// });

// 게시글 상세 불러오기
router.get("/:id", async (req, res, next) => {
  try {
    const boardId = await db.Board.findOne({ where: { id: req.params.id } });
    if (!boardId) {
      return res.status(404).send("게시글이 존재하지 않습니다.");
    }
    const board = await db.Board.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "userNickname", "userProfile"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["id", "userNickname", "userProfile"]
            }
          ],
          attributes: ["id", "content", "reply", "createdAt"]
        }
      ],
      attributes: ["id", "category", "title", "content", "view", "createdAt"]
    });
    res.json(board);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 게시글 댓글 쓰기
router.post("/comment", async (req, res, next) => {
  try {
    const newComment = await db.Comment.create({
      content: req.body.comment,
      reply: req.body.reply,
      UserId: req.user.id,
      BoardId: req.body.boardId
    });
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "userNickname", "userProfile"]
        }
      ],
      attributes: ["id", "content", "reply", "createdAt"]
    });
    // console.log(newComment);
    return res.status(200).json(comment);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

// 게시글 댓글 삭제
router.delete("/comment/:id", async (req, res, next) => {
  try {
    const comment = await db.Comment.findOne({
      where: { id: req.params.id }
    });
    if (!comment) {
      return res.status(404).send("댓글이 존재하지 않습니다.");
    }
    // await group.removeGallery(req.body.galleryId); // Gallery 테이블의 GroupId 컬럼만 삭제된다.
    await db.Comment.destroy({ where: { id: req.params.id } }); // 행 전체가 삭제된다.
    res.json(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 게시글 댓글 수정
router.patch("/comment/:id", async (req, res, next) => {
  try {
    db.Comment.update(
      {
        content: req.body.comment
      },
      {
        where: { id: req.params.id }
      }
    );
    return res.json({ id: req.params.id, content: req.body.comment });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// 게시글 대댓글 쓰기
router.post("/comment/reply", async (req, res, next) => {
  try {
    const newComment = await db.Comment.create({
      content: req.body.comment,
      reply: req.body.id,
      UserId: req.user.id,
      BoardId: req.body.boardId
    });
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "userNickname", "userProfile"]
        }
      ],
      attributes: ["id", "content", "reply", "createdAt"]
    });
    // console.log(newComment);
    return res.status(200).json(comment);
  } catch (e) {
    console.error(e);
    //에러 시, 처리는 여기서
    return next(e);
  }
});

module.exports = router;
