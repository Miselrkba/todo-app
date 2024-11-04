import React, { useEffect, useState } from "react";
import { ITask } from "./types";
import TaskColumn from "./components/TaskColumn";
import "./App.css";
import { nanoid } from "nanoid";
import TaskFormModal from "./components/AddTaskModal";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const addNewTask = (title: string) => {
    const newTask: ITask = {
      id: nanoid(),
      title,
      status: "To do",
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) return task;

        let newStatus;
        if (task.status === "To do") {
          newStatus = "In progress";
        } else if (task.status === "In progress") {
          newStatus = "Done";
        } else {
          newStatus = "To do";
        }

        return {
          ...task,
          status: newStatus,
        };
      })
    );
  };

  const editTask = (updatedTask: ITask): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <h1>Zoznam úloh</h1>
      <button className="add-task-button" onClick={() => setIsFormOpen(true)}>
        Pridať úlohu
      </button>
      {isFormOpen && (
        <TaskFormModal
          onClose={() => setIsFormOpen(false)}
          addTask={addNewTask}
        />
      )}
      <div className="task-container">
        <TaskColumn
          status="To do"
          tasks={tasks.filter((task) => task.status === "To do")}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
        />
        <TaskColumn
          status="In progress"
          tasks={tasks.filter((task) => task.status === "In progress")}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
        />
        <TaskColumn
          status="Done"
          tasks={tasks.filter((task) => task.status === "Done")}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
};

export default App;
