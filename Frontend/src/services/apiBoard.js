import { createManyColumns } from './apiColumn.js';
import api from './axiosConfig.js';
import { toast } from 'react-hot-toast';

export const getBoard = async (slug, userId) => {
  try {
    const data = await api.get(`/api/boards/${slug}`, {
      params: {
        userId,
      },
    });
    return data.data.board;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const data = await api.delete(`/api/boards/${boardId}`);
    return data.data.board;
  } catch (error) {
    throw error;
  }
};

export const createBoard = async ({ name, userId, columnsData }) => {
  try {
    const data = await api.post(`/api/boards/`, { name, userId });

    // if there is no error in creating board and there is column data then create columsn for board as well.
    const board = data.data?.newBoard;
    if (board?._id && columnsData.length > 0) {
      await createManyColumns({ columns: columnsData, boardId: board._id });
    }

    return board;
  } catch (error) {
    throw error;
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
