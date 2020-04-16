const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');
const { wrapAsync } = require('../../helpers/async-helper');
const CustomError = require('../../helpers/custom-error');

router
  .route('/:boardId/tasks')
  .get(
    wrapAsync(async (req, res) => {
      const tasks = await taskService.getAll(req.params.boardId);
      res.status(200).json(tasks.map(Task.toResponse));
    })
  )
  .post(
    wrapAsync(async (req, res) => {
      const reqData = {
        ...req.body,
        boardId: req.params.boardId
      };
      const taskId = await taskService.createTask(reqData);
      res.status(200).send(Task.toResponse(taskId));
    })
  );
router
  .route('/:boardId/tasks/:taskId')
  .get(
    wrapAsync(async (req, res) => {
      const taskId = req.params.taskId;
      const taskData = await taskService.getById(req.params.boardId, taskId);
      if (!taskData) {
        throw new CustomError('No such data', 404);
      }
      res.status(200).json(Task.toResponse(taskData));
    })
  )
  .put(
    wrapAsync(async (req, res) => {
      const result = await taskService.updateTask(req.params.boardId, req.body);
      res.status(200).send(Task.toResponse(result));
    })
  )
  .delete(
    wrapAsync(async (req, res) => {
      const taskId = req.params.taskId;
      await taskService.deleteTask(req.params.boardId, taskId);
      res.sendStatus(204);
    })
  );

module.exports = router;
