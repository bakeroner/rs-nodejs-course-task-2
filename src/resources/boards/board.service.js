const boardRepo = require('./board.db.repository');

const getAll = async () => boardRepo.getAll();

const getById = async boardId => boardRepo.getById(boardId);

const createBoard = async boardData => boardRepo.createNote(boardData);

const deleteBoard = async boardId => boardRepo.deleteNote(boardId);

const updateBoard = async boardData => boardRepo.updateNote(boardData);

module.exports = {
  getAll,
  getById,
  createBoard,
  deleteBoard,
  updateBoard
};
