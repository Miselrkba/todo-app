import React, { useState } from "react";
import { ITask } from "../types";

interface EditTaskModalProps {
  task: ITask;
  onClose: () => void;
  onUpdate: (updatedTask: ITask) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onUpdate,
}) => {
  const [title, setTitle] = useState<string>(task.title);
  const [error, setError] = useState<string>("");

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (title.length === 0) {
      setError("Nemôžete nechať názov úlohy prázdny");
    } else {
      const updatedTask = { ...task, title };
      onUpdate(updatedTask);
      onClose();
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleUpdate} className="task-form">
        <input
          type="text"
          placeholder="Názov úlohy"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Uložiť</button>
        <button type="button" onClick={onClose}>
          Zrušiť
        </button>
      </form>
    </div>
  );
};

export default EditTaskModal;
