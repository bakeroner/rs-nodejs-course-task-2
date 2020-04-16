const Board = require('./board.model');
const { onBoardDelete } = require('../tasks/task.db.repository');

const getAll = async () => Board.find();

const getById = async boardId => Board.findOne({ _id: boardId });

const createNote = async boardData => Board.create(boardData);

const updateNote = async boardToUpdate =>
  Board.updateOne({ _id: boardToUpdate.id }, boardToUpdate);

const deleteNote = async boardId =>
  Promise.all([Board.deleteOne({ _id: boardId }), onBoardDelete(boardId)]);

module.exports = { getAll, getById, createNote, updateNote, deleteNote };
