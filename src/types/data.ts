import { ModalState } from "@store/modal-slice";

export type Subtasks = Array<{ isCompleted: boolean; title: string }>;

export type TaskType = {
  id: string;
  description: string;
  status: string;
  subtasks: Subtasks;
  title: string;
};

export interface ModalType extends ModalState {
  currentBoard: string;
}
