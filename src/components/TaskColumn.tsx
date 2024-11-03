import React from "react";
import TaskCard from "./TaskCard";
import { ITask, TaskStatus } from "../types";

const statusClassMap: Record<TaskStatus, string> = {
  "To do": "to-do",
  "In progress": "in-progress",
  Done: "done",
};

interface TaskColumnProps {
  status: TaskStatus;
  tasks: ITask[];
  updateTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (updatedTask: ITask) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  updateTaskStatus,
  deleteTask,
  editTask,
}) => {
  return (
    <div className={`task-column ${statusClassMap[status]}`}>
      <h2>{status}</h2>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default TaskColumn;
