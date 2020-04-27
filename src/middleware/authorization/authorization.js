const router = require('express').Router();
const { wrapAsync } = require('../../helpers/async-helper');
const CustomError = require('../../helpers/custom-error');
const authorizationService = require('./authorization.service');
const jwt = require('jsonwebtoken');

router.route('/').post(
  wrapAsync(async (req, res, next) => {
    const noteData = await authorizationService.findUserByCreds(req.body);
    if (!noteData) {
      throw new CustomError('Invalid credentials', 401);
    } else {
      const token = jwt.sign(
        {
          userId: noteData.id,
          login: noteData.login
        },
        process.env.JWT_SECRET_KEY
      );
      res.status(200).send(token);
    }
  })
);

module.exports = router;
