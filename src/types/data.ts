export type Subtasks = Array<{ isCompleted: boolean; title: string }>;

export type TaskType = {
  id: string;
  description: string;
  status: string;
  subtasks: Subtasks;
  title: string;
};

export interface ModalState {
  type: string;
  data?: TaskType | null;
}

export interface ModalType extends ModalState {
  currentBoard: string;
  status?: string[];
  boardTab?: string;
}

export interface ColumnType {
  id: string;
  name?: string;
  tasks?: TaskType[];
}

export interface BoardType {
  id: string;
  name: string;
  columns?: ColumnType[];
}
