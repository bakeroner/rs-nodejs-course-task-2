const taskRepo = require('./task.db.repository');

const getAll = async boardId => taskRepo.getAll(boardId);

const getById = async (boardId, taskId) => taskRepo.getById(boardId, taskId);

const createTask = async taskData => taskRepo.createNote(taskData);

const deleteTask = async (boardId, taskId) =>
  taskRepo.deleteNote(boardId, taskId);

const updateTask = async (boardId, taskData) =>
  taskRepo.updateNote(boardId, taskData);

module.exports = {
  getAll,
  getById,
  createTask,
  deleteTask,
  updateTask
};
