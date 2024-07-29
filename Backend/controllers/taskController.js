import subtaskModel from '../models/subtaskModel.js';
import taskModel from '../models/taskModel.js';

export const createTask = async function (req, res, next) {
  const { title, description, status, userId } = req.body;

  const newTask = await taskModel.create({
    title,
    description,
    status,
    userId,
  });

  res.status(200).json({
    status: 'success',
    data: {
      newTask,
    },
  });

  try {
  } catch (error) {
    res.send(error.message);
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

  console.log(subtasksResults);

  subtasksResults.forEach((subtask) => {
    task.subTasks.push(subtask._id);
  });

  await task.save();

  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });

  try {
  } catch (error) {
    res.send(error.message);
    console.log('Error in createManySubtasks 💥', error);
  }
};

export const updateSubtask = async function (req, res, next) {
  const { isDone } = req.body;

  const newsubTask = await taskModel.findByIdAndUpdate(
    req.params.subtaskId,
    {
      isDone,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      newsubTask,
    },
  });

  try {
  } catch (error) {
    res.send(error.message);
    console.log('Error in updateSubtask 💥', error);
  }
};
