/* eslint-disable consistent-return */
import db from '@/database';
import StatusCodes from 'http-status-codes';
import taskMessages from '@/utils/taskMessages';

const Task = db.models.task;

/**
 * GET /task
 * Return all tasks
 */
export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.status(StatusCodes.OK).send(tasks);
  } catch (error) {
    next(error);
  }
};

/**
 * POST /task
 * Create a new task
 */
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(StatusCodes.CREATED).send(task);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /task/:id
 * Return task by id
 */
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: taskMessages.TASK_NOT_FOUND });
    }

    res.status(StatusCodes.OK).send(task);
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /task/:id
 * Update task by id
 */
export const updateTask = async (req, res, next) => {
  try {
    const [updatedRows] = await Task.update(req.body, {
      where: { id: req.params.id },
    });

    if (updatedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: taskMessages.TASK_NOT_FOUND });
    }

    res.status(StatusCodes.OK).send({ message: taskMessages.TASK_UPDATED });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /task/:id
 * Delete task by id
 */
export const deleteTask = async (req, res, next) => {
  try {
    const deletedRows = await Task.destroy({
      where: { id: req.params.id },
    });

    if (deletedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: taskMessages.TASK_NOT_FOUND });
    }

    res.status(StatusCodes.OK).send({ message: taskMessages.TASK_DELETED });
  } catch (error) {
    next(error);
  }
};
