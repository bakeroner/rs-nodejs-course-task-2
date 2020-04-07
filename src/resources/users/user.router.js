const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { wrapAsync } = require('../../helpers/async-helper');

router
  .route('/')
  .get(
    wrapAsync(async (req, res) => {
      const users = await usersService.getAll();
      res.json(users.map(User.toResponse));
    })
  )
  .post(
    wrapAsync(async (req, res) => {
      const userId = await usersService.createUser(req.body);
      res.send(userId);
    })
  );
router
  .route('/:userId')
  .get(
    wrapAsync(async (req, res) => {
      const userId = req.params.userId;
      const userData = await usersService.getById(userId);
      res.json(User.toResponse(userData));
    })
  )
  .put(
    wrapAsync(async (req, res) => {
      req.body.id = req.params.userId;
      const result = await usersService.updateUser(req.body);
      res.send(result);
    })
  )
  .delete(
    wrapAsync(async (req, res) => {
      const userId = req.params.userId;
      const result = await usersService.deleteUser(userId);
      res.json(result);
    })
  );

module.exports = router;
