const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const { wrapAsync } = require('../../helpers/async-helper');

const boardCheck = async (req, res, next) => {
  res.locals.boardId = req.params.boardId;
  await taskService.checkBoard(req.params.boardId);
  next();
};

router
  .route('/:boardId/tasks')
  .all(wrapAsync(boardCheck))
  .get(
    wrapAsync(async (req, res) => {
      const tasks = await taskService.getAll(res.locals.boardId);
      res.json(tasks.map(Task.toResponse));
    })
  )
  .post(
    wrapAsync(async (req, res) => {
      const taskId = await taskService.createTask(req.body);
      res.send(taskId);
    })
  );
router
  .route('/:boardId/tasks/:taskId')
  .all(wrapAsync(boardCheck))
  .get(
    wrapAsync(async (req, res) => {
      const taskId = req.params.taskId;
      const taskData = await taskService.getById(taskId);
      res.json(Task.toResponse(taskData));
    })
  )
  .put(
    wrapAsync(async (req, res) => {
      req.body.id = req.body.id || req.params.taskId;
      const result = await taskService.updateTask(req.body);
      res.send(result);
    })
  )
  .delete(
    wrapAsync(async (req, res) => {
      const taskId = req.params.taskId;
      const result = await taskService.deleteTask(taskId);
      res.json(result);
    })
  );

module.exports = router;
