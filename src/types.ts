export type TaskStatus = "To do" | "In progress" | "Done";

export interface ITask {
  id: string;
  title: string;
  status: TaskStatus;
}
