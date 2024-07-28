import axios from 'axios';
import api from './axiosConfig.js';
import { toast } from 'react-hot-toast';

export const getBoard = async (slug) => {
  try {
    const data = await api.get(`/api/boards/${slug}`);
    console.log(data.data.board);
    return data.data.board;
  } catch (error) {
    toast.error(error.message);
  }
};

export const createBoard = async (name, columnsData) => {
  try {
    const data = await axios.post(`/boards/`, { name });
    return data;
  } catch (error) {
    return error;
  }
};
