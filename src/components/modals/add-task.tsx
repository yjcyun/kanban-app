import { useForm, FormProvider } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";
import TaskForm from "@components/form/task-form";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { TaskType } from "@type/data";
import { addTask } from "@store/task-slice";

type AddTaskProps = {
  currentBoard: string;
};

const AddTask = ({ currentBoard }: AddTaskProps) => {
  const { boardColumns } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const methods = useForm<TaskType>({
    defaultValues: {
      id: nanoid(),
      title: "",
      description: "",
      subtasks: [{ title: "", isCompleted: false }],
      status: boardColumns[0],
    },
  });

  const onSubmit = (data: TaskType) => {
    dispatch(addTask({ currentBoard, newTask: data }));
  };

  return (
    <Modal>
      <ModalTitle title="Add New Task" />
      <FormProvider {...methods}>
        <TaskForm
          mode="add"
          onSubmitHandler={onSubmit}
          boardColumns={boardColumns}
        />
      </FormProvider>
    </Modal>
  );
};

export default AddTask;
