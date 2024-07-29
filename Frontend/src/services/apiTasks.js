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
    console.log(data);
    return data.data.tasks;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};
