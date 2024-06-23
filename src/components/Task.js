import React from 'react';

function Task({ task, onDeleteTask }) {
  const { _id, title, description, dueDate } = task;

  return (
    <div className="task-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <small>Due Date: {new Date(dueDate).toDateString()}</small>
      <button className="delete" onClick={() => onDeleteTask(_id)}>
        Delete
      </button>
    </div>
  );
}

export default Task;
