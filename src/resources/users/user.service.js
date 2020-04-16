const usersRepo = require('./user.db.repository');

const getAll = async () => usersRepo.getAll();

const getById = async userId => usersRepo.getById(userId);

const createUser = async userData => usersRepo.createNote(userData);

const deleteUser = async userId => usersRepo.deleteNote(userId);

const updateUser = async userData => usersRepo.updateNote(userData);

module.exports = {
  getAll,
  getById,
  createUser,
  deleteUser,
  updateUser
};
