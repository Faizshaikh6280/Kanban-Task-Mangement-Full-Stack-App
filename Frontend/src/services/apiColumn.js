import toast from 'react-hot-toast';
import api from './axiosConfig';

export const createManyColumns = async ({ columns, boardId }) => {
  try {
    const data = await api.post(`/api/columns/many`, {
      columns,
      boardId,
    });
    return data.data.board;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};

export const createColumn = async ({ column, boardSlug, userId }) => {
  try {
    const data = await api.post(`/api/columns`, {
      name: column.name,
      color: column.color,
      boardSlug,
      userId,
    });

    return data.data.newColumn;
  } catch (error) {
    throw error;
  }
};

export const deleteColumn = async ({ columnId, boardId, userId }) => {
  try {
    const data = await api.delete(`/api/columns/${columnId}`, {
      params: {
        boardId,
        userId,
      },
    });

    return data.data.board;
  } catch (error) {
    throw error;
  }
};
