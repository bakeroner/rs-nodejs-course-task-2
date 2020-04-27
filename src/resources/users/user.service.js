const usersRepo = require('./user.db.repository');
const bcrypt = require('bcrypt');
const CustomError = require('../../helpers/custom-error');

const getAll = async () => usersRepo.getAll();

const getById = async userId => usersRepo.getById(userId);

const hashPassword = async (userData, cb) => {
  return bcrypt
    .genSalt(+process.env.SALT_ROUNDS)
    .then(salt => {
      return bcrypt
        .hash(userData.password, salt)
        .then(hash => {
          const tempData = { ...userData };
          tempData.password = hash;
          return cb(tempData);
        })
        .catch(err => {
          if (err) {
            throw new CustomError(err.message, 401);
          }
        });
    })
    .catch(err => {
      if (err) {
        throw new CustomError(err.msg, 401);
      }
    });
};

const createUser = async userData => {
  return hashPassword(userData, usersRepo.createNote);
};

const deleteUser = async userId => usersRepo.deleteNote(userId);

const updateUser = async userData => {
  return hashPassword(userData, usersRepo.updateNote);
};

module.exports = {
  getAll,
  getById,
  createUser,
  deleteUser,
  updateUser
};
