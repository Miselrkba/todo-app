import React, { useState } from "react";
import { ITask } from "../types";
import EditTaskModal from "./EditTaskModal";

interface TaskCardProps {
  task: ITask;
  updateTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (updatedTask: ITask) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  updateTaskStatus,
  deleteTask,
  editTask,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const buttonLabels: Record<ITask["status"], string> = {
    "To do": "Štart",
    "In progress": "Dokončiť",
    Done: "Odznova",
  };

  const handleEditTask = (updatedTask: ITask): void => {
    editTask(updatedTask);
  };

  return (
    <div className="task-card">
      <p>{task.title}</p>
      <button onClick={() => updateTaskStatus(task.id)}>
        {buttonLabels[task.status] || ""}
      </button>
      <button onClick={() => setIsEditModalOpen(true)}>Upraviť</button>
      <button onClick={() => deleteTask(task.id)}>Odstrániť</button>
      {isEditModalOpen && (
        <EditTaskModal
          task={task}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleEditTask}
        />
      )}
    </div>
  );
};

export default TaskCard;
