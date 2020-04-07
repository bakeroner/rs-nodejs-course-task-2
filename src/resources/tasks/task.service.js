const taskRepo = require('../../db/db.service');
const taskTable = require('../../db/db-tables').tasks;
const boardTable = require('../../db/db-tables').boards;
const Task = require('./task.model');

const checkBoard = boardId => taskRepo.getById(boardTable, boardId);

const getAll = async boardId => {
  const allBoardTasks = await taskRepo.getAll(taskTable);
  return !boardId
    ? allBoardTasks
    : allBoardTasks.filter(task => task.boardId === boardId);
};

const getById = taskId => taskRepo.getById(taskTable, taskId);

const createTask = taskData =>
  taskRepo.createNote(taskTable, new Task(taskData));

const deleteTask = taskId => taskRepo.deleteNote(taskTable, taskId);

const updateTask = taskData =>
  taskRepo.updateNote(taskTable, new Task(taskData));

const onBoardDelete = async boardId => {
  const allTasks = await getAll(boardId);
  return Promise.all(allTasks.map(item => deleteTask(item.id)));
};

const onUserDelete = async userId => {
  const allTasks = await getAll();
  return Promise.all(
    allTasks
      .filter(task => task.userId === userId)
      .map(item => {
        const nextData = {
          ...item
        };
        nextData.userId = null;
        return updateTask(nextData);
      })
  );
};

module.exports = {
  getAll,
  getById,
  createTask,
  deleteTask,
  updateTask,
  checkBoard,
  onBoardDelete,
  onUserDelete
};
