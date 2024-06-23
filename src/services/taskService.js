import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/tasks';

export const getTasks = async () => {
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const addTask = async (task) => {
    try {
        const response = await axios.post(apiUrl, task);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        console.log(`Deleting task with ID: ${id}`);
        const response = await axios.delete(`${apiUrl}/${id}`);
        console.log('Task deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error.response ? error.response.data : error.message);
        throw error;
    }
};
