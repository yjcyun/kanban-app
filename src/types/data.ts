export type Subtasks = Array<{ isCompleted: boolean; title: string }>;

export type TaskType = {
  description: string;
  status: string;
  subtasks: Subtasks;
  title: string;
};
