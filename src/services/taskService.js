import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/tasks';

export const getTasks = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(apiUrl, task);
  return response.data;
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting task with id ${id}: ${error.message}`);
  }
};
