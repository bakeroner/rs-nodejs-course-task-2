const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { wrapAsync } = require('../../helpers/async-helper');
const CustomError = require('../../helpers/custom-error');

router
  .route('/')
  .get(
    wrapAsync(async (req, res) => {
      const users = await usersService.getAll();
      res.status(200).json(users.map(User.toResponse));
    })
  )
  .post(
    wrapAsync(async (req, res) => {
      const user = await usersService.createUser(req.body);
      res.status(200).json(User.toResponse(user));
    })
  );
router
  .route('/:userId')
  .get(
    wrapAsync(async (req, res) => {
      const userId = req.params.userId;
      const userData = await usersService.getById(userId);
      if (!userData) {
        throw new CustomError('No such data', 404);
      }
      res.status(200).json(User.toResponse(userData));
    })
  )
  .put(
    wrapAsync(async (req, res) => {
      const result = await usersService.updateUser(req.body);
      res.status(200).json(User.toResponse(result));
    })
  )
  .delete(
    wrapAsync(async (req, res) => {
      const userId = req.params.userId;
      await usersService.deleteUser(userId);
      res.sendStatus(204);
    })
  );

module.exports = router;
