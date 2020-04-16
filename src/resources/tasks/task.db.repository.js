const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId });

const getById = async (boardId, taskId) =>
  Task.findOne({ _id: taskId, boardId });

const createNote = async taskData => Task.create(taskData);

const updateNote = async (boardId, taskToUpdate) =>
  Task.updateOne({ _id: taskToUpdate.id, boardId }, taskToUpdate);

const deleteNote = async (boardId, taskId) =>
  Task.deleteOne({ _id: taskId, boardId });

const onBoardDelete = async boardId => Task.deleteMany({ boardId });

const onUserDelete = async userId =>
  Task.updateMany({ userId }, { $set: { userId: null } });

module.exports = {
  getAll,
  getById,
  createNote,
  updateNote,
  deleteNote,
  onBoardDelete,
  onUserDelete
};
