import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { getTasks, addTask, deleteTask } from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleAddTask = async (task) => {
    await addTask(task);
    loadTasks();
  };

  const handleDeleteTask = async (id) => {
    try {
      console.log(`Deleting task with ID: ${id}`);
      await deleteTask(id);
      console.log('Task deleted successfully');
      loadTasks(); // Refresh tasks after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
}

export default App;
