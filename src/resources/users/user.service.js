const usersRepo = require('../../db/db.service');
const tableName = require('../../db/db-tables').users;
const User = require('./user.model');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll(tableName);

const getById = userId => usersRepo.getById(tableName, userId);

const createUser = userData =>
  usersRepo.createNote(tableName, new User(userData));

const deleteUser = async userId => {
  const deletedUserId = await usersRepo.deleteNote(tableName, userId);
  await taskService.onUserDelete(deletedUserId);
  return deletedUserId;
};
const updateUser = userData =>
  usersRepo.updateNote(tableName, new User(userData));

module.exports = {
  getAll,
  getById,
  createUser,
  deleteUser,
  updateUser
};
