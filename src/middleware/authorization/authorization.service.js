const User = require('../../resources/users/user.model');
const bcrypt = require('bcrypt');
const CustomError = require('../../helpers/custom-error');

const findUserByCreds = async reqData => {
  const userNote = await User.findOne({ login: reqData.login });
  return bcrypt
    .compare(reqData.password, userNote.password)
    .then(isSame => {
      return !userNote || !isSame ? null : User.toResponse(userNote);
    })
    .catch(err => {
      if (err) {
        throw CustomError(err.msg, 401);
      }
    });
};

module.exports = { findUserByCreds };
