import api from './axiosConfig.js';
import { toast } from 'react-hot-toast';

export const getBoard = async (slug) => {
  try {
    const data = await api.get(`/api/boards/${slug}`);
    console.log(data);
    return data.data.board;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const createBoard = async (name, columnsData) => {
  try {
    const data = await axios.post(`/api/boards/`, { name });
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllBoards = async (userId) => {
  try {
    const data = await api.get(`/api/boards`, {
      params: {
        userId,
      },
    });
    return data.data.boards;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};
