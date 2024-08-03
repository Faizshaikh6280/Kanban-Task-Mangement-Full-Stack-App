import api from './axiosConfig';

export const login = async ({ username, password }) => {
  try {
    const data = await api.post(`/api/auth/login`, {
      username,
      password,
    });

    const user = data.data?.user;

    return user || null;
  } catch (error) {
    throw error;
  }
};

export const signup = async ({ username, password, email }) => {
  try {
    const data = await api.post(`/api/auth/signup`, {
      username,
      password,
      email,
    });
    return data.data.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.get(`/api/auth/logout`);
    return true;
  } catch (error) {
    throw error;
  }
};
