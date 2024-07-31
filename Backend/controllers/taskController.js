import subtaskModel from '../models/subtaskModel.js';
import taskModel from '../models/taskModel.js';
import boardModel from '../models/boardModel.js';

export const createTask = async function (req, res, next) {
  const { title, description, status, userId, boardSlug } = req.body;
  // check whether boardExist with the user or not.
  const board = await boardModel.findOne({ slug: boardSlug, userId });

  if (!board) {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  const newTask = await taskModel.create({
    title,
    description,
    status,
    userId,
    boardSlug,
  });

  res.status(200).json({
    status: 'success',
    newTask,
  });

  try {
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log('Error in createTask 💥', error);
  }
};

export const getTask = async function (req, res, next) {
  try {
    const task = await taskModel
      .findById(req.params.taskId)
      .populate('subtasks');

    res.status(200).json({
      status: 'success',
      task,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
    console.log('Error in getTask 💥', error);
  }
};

export const getAllTasks = async function (req, res, next) {
  try {
    const { userId, boardSlug } = req.query;
    // NOTE💡: find user if it is exists or not.
    // if user does not exists throw error
    const tasks = await taskModel
      .find({ userId, boardSlug })
      .populate('subTasks');

    res.status(200).json({
      status: 'success',
      tasks,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
    console.log('Error in getAllTasks 💥', error);
  }
};

export const createSubtask = async function (req, res, next) {
  const { subtaskname, taskId } = req.body;

  const task = await taskModel.findById(taskId);

  if (!task) {
    throw new Error('Task does not exists');
  }

  const newsubTask = await subtaskModel.create({
    subtaskname,
  });

  task.subTasks.push(newsubTask._id);
  await task.save();

  res.status(200).json({
    status: 'success',
    data: {
      newsubTask,
    },
  });

  try {
  } catch (error) {
    res.send(error.message);
    console.log('Error in createSubtask 💥', error);
  }
};

export const createManySubtasks = async function (req, res, next) {
  const { subtasks, taskId } = req.body;

  const task = await taskModel.findById(taskId);
  if (!task) {
    throw new Error('Task does not exists');
  }

  let subtasksPromises = [];

  subtasks.forEach((el) => {
    subtasksPromises.push(
      subtaskModel.create({
        subtaskname: el.name,
      })
    );
  });

  const subtasksResults = await Promise.all(subtasksPromises);

  subtasksResults.forEach((subtask) => {
    task.subTasks.push(subtask._id);
  });

  await task.save();

  res.status(200).json({
    status: 'success',
    task,
  });

  try {
  } catch (error) {
    res.send(error.message);
    console.log('Error in createManySubtasks 💥', error);
  }
};

export const updateTask = async function (req, res, next) {
  const { taskId } = req.params;
  const { status, subtasks } = req.body;

  const task = await taskModel.findById(taskId);
  if (!task) throw new Error('Task not found.');

  // update subtasks
  if (subtasks?.length > 0) {
    const subtasksPromises = subtasks.map((subtask) =>
      subtaskModel.findByIdAndUpdate(
        subtask._id,
        {
          isDone: subtask.isDone,
        },
        {
          runValidators: true,
        }
      )
    );

    await Promise.all(subtasksPromises);
  }

  // update task's status.
  if (status) {
    task.status = status;
    await task.save();
  }
  res.status(200).json({
    status: 'success',
    task,
  });

  try {
  } catch (error) {
    res.send(error.message);
    console.log('Error in updateTask 💥', error);
  }
};
