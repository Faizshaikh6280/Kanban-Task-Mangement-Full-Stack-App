import api from './axiosConfig.js';
import { toast } from 'react-hot-toast';

export const getAllTasks = async (userId, boardSlug) => {
  try {
    const data = await api.get(`/api/tasks`, {
      params: {
        userId,
        boardSlug,
      },
    });
    return data.data.tasks;
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const createTask = async ({
  title,
  description,
  status,
  userId,
  boardSlug,
  subtasks,
}) => {
  try {
    const data = await api.post(`/api/tasks`, {
      title,
      description: description.split(' ').splice(0, 150).join(' '),
      status,
      userId,
      boardSlug,
    });
    // if there is no error create subtasks for this task if any.
    const taskId = data.data?.newTask._id;
    if (taskId && subtasks.length > 0) {
      await createSubtasks({ subtasks, taskId });
    }
    return data.data.newTask;
  } catch (error) {
    console.log(error);
    toast.error(error.response.error);
  }
};

export const createSubtasks = async ({ subtasks, taskId }) => {
  try {
    await api.post(`/api/tasks/subtask-many`, {
      subtasks,
      taskId,
    });
    // if there is no error create subtasks for this task if any.
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const updateTask = async ({ subtasks, status, taskId }) => {
  try {
    const dataToUpdate = {};
    if (subtasks.length > 0) {
      dataToUpdate.subtasks = subtasks;
    }
    if (status) {
      dataToUpdate.status = status;
    }

    if (Object.keys(dataToUpdate).length <= 0) {
      return true;
    }

    const data = await api.patch(`/api/tasks/${taskId}`, dataToUpdate);
    return data.data.task;
  } catch (error) {
    toast.error(error.response.data.error);
    console.log(error);
  }
};
