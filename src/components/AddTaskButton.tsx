import React from 'react';

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => (
  <button className="add-task-button" onClick={onClick}>
    Pridať úlohu
  </button>
);

export default AddTaskButton;
