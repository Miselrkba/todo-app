import React, { useState } from "react";

interface TaskFormModalProps {
  addTask: (title: string) => void;
  onClose: () => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ addTask, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length === 0) {
      setError("Nemôžete pridať prázdnu úlohu");
    } else {
      addTask(title);
      setTitle("");
      setError("");
      onClose();
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Nová úloha"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Pridať</button>
        <button type="button" onClick={onClose}>
          Zrušiť
        </button>
      </form>
    </div>
  );
};

export default TaskFormModal;
