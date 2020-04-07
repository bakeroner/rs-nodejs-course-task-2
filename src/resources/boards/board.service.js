const boardRepo = require('../../db/db.service');
const tableName = require('../../db/db-tables').boards;
const Board = require('./board.model');
const taskService = require('../tasks/task.service');

const getAll = () => boardRepo.getAll(tableName);

const getById = boardId => boardRepo.getById(tableName, boardId);

const createBoard = boardData =>
  boardRepo.createNote(tableName, new Board(boardData));

const deleteBoard = async boardId => {
  const boardDeletedId = await boardRepo.deleteNote(tableName, boardId);
  await taskService.onBoardDelete(boardDeletedId);
  return boardDeletedId;
};

const updateBoard = boardData =>
  boardRepo.updateNote(tableName, new Board(boardData));

module.exports = {
  getAll,
  getById,
  createBoard,
  deleteBoard,
  updateBoard
};
