import { useForm, FormProvider } from "react-hook-form";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";
import TaskForm from "@components/form/task-form";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { ModalType, TaskType } from "@type/data";
import { updateTask } from "@store/task-slice";

const EditTask = ({ currentBoard, data }: ModalType) => {
  const { boardColumns } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const methods = useForm<TaskType>({
    defaultValues: {
      id: data?.id,
      title: data?.title,
      description: data?.description,
      subtasks: data?.subtasks.map((subtask) => ({
        title: subtask.title,
        isCompleted: subtask.isCompleted,
      })),
      status: data?.status,
    },
  });

  const onSubmit = (data: TaskType) => {
    dispatch(updateTask({ currentBoard, prevTask: data, updatedTask: data }));
  };

  return (
    <Modal>
      <ModalTitle title="Edit Task" />
      <FormProvider {...methods}>
        <TaskForm
          mode="edit"
          onSubmitHandler={onSubmit}
          boardColumns={boardColumns}
        />
      </FormProvider>
    </Modal>
  );
};

export default EditTask;
