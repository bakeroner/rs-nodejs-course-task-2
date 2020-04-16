const User = require('./user.model');
const { onUserDelete } = require('../tasks/task.db.repository');

const getAll = async () => User.find({});

const getById = async userId => User.findOne({ _id: userId });

const createNote = async userData => User.create(userData);

const updateNote = async userToUpdate =>
  User.updateOne({ _id: userToUpdate.id }, userToUpdate);

const deleteNote = async userId =>
  Promise.all([User.deleteOne({ _id: userId }), onUserDelete(userId)]);

module.exports = { getAll, getById, createNote, updateNote, deleteNote };
