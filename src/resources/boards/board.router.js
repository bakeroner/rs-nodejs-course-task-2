const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { wrapAsync } = require('../../helpers/async-helper');

router
  .route('/')
  .get(
    wrapAsync(async (req, res) => {
      const boards = await boardService.getAll();
      res.json(boards.map(Board.toResponse));
    })
  )
  .post(
    wrapAsync(async (req, res) => {
      const boardId = await boardService.createBoard(req.body);
      res.send(boardId);
    })
  );
router
  .route('/:boardId')
  .get(
    wrapAsync(async (req, res) => {
      const boardId = req.params.boardId;
      const boardData = await boardService.getById(boardId);
      res.json(Board.toResponse(boardData));
    })
  )
  .put(
    wrapAsync(async (req, res) => {
      req.body.id = req.params.boardId;
      const result = await boardService.updateBoard(req.body);
      res.send(result);
    })
  )
  .delete(
    wrapAsync(async (req, res) => {
      const boardId = req.params.boardId;
      const result = await boardService.deleteBoard(boardId);
      res.json(result);
    })
  );

module.exports = router;
