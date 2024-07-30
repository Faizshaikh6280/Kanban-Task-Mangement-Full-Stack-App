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

export const createColumn = async ({ column, boardSlug }) => {
  try {
    const data = await api.post(`/api/columns/many`, {
      name: column.name,
      color: column.color,
      boardSlug,
    });
    return data.data.board;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.error);
  }
};
