const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const { wrapAsync } = require('../../helpers/async-helper');
const CustomError = require('../../helpers/custom-error');

router
  .route('/')
  .get(
    wrapAsync(async (req, res) => {
      const boards = await boardService.getAll();
      res.status(200).json(boards.map(Board.toResponse));
    })
  )
  .post(
    wrapAsync(async (req, res) => {
      const boardId = await boardService.createBoard(req.body);
      res.status(200).send(Board.toResponse(boardId));
    })
  );
router
  .route('/:boardId')
  .get(
    wrapAsync(async (req, res) => {
      const boardId = req.params.boardId;
      const boardData = await boardService.getById(boardId);
      if (!boardData) {
        throw new CustomError('No such data', 404);
      }
      res.status(200).json(Board.toResponse(boardData));
    })
  )
  .put(
    wrapAsync(async (req, res) => {
      const result = await boardService.updateBoard(req.body);
      res.status(200).send(Board.toResponse(result));
    })
  )
  .delete(
    wrapAsync(async (req, res) => {
      const boardId = req.params.boardId;
      await boardService.deleteBoard(boardId);
      res.sendStatus(204);
    })
  );

module.exports = router;
