import { useState } from "react";
import { ModalType, Subtasks } from "@type/data";
import CheckboxField from "@components/form/checkbox-field";
import SelectField from "@components/form/select-field";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { openModal } from "@store/modal-slice";
import { updateTask } from "@store/task-slice";
import Dropdown from "@components/ui/dropdown";

const completedSubtasks = (subtasks: Subtasks) =>
  subtasks.filter((task) => task.isCompleted).length;

const ViewTask = ({ data, currentBoard }: ModalType) => {
  const { description, title, status, subtasks } = data!;
  const [tasks, setTasks] = useState(data!);
  const { boardColumns } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const onSubtasksChange = (index: number) => {
    const copiedNewSubtasks = [...tasks.subtasks];

    copiedNewSubtasks[index] = {
      ...copiedNewSubtasks[index],
      isCompleted: !copiedNewSubtasks[index].isCompleted,
    };

    setTasks({ ...tasks, subtasks: copiedNewSubtasks });
    dispatch(
      updateTask({
        currentBoard,
        updatedTask: { ...tasks, subtasks: copiedNewSubtasks },
        prevTask: tasks,
      })
    );
  };

  const onStatusChange = (status: string) => {
    setTasks({ ...tasks, status });
    dispatch(
      updateTask({
        currentBoard,
        updatedTask: { ...tasks, status },
        prevTask: tasks,
      })
    );
  };

  const onEditTask = () => {
    dispatch(openModal({ type: "edit-task" }));
  };

  const onDeleteTask = () => {
    dispatch(openModal({ type: "delete-task" }));
  };

  return (
    <Modal>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-6">
          <ModalTitle title={title} />
          <Dropdown
            text="Task"
            direction="center"
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        </div>
        {description && <p className="body-lg">{description}</p>}
        <div>
          <h3 className="body-md mb-4">
            Subtasks ({completedSubtasks(subtasks)} of {subtasks.length})
          </h3>
          {tasks.subtasks.map((task, index) => (
            <CheckboxField
              label={task.title}
              isChecked={task.isCompleted}
              onChange={onSubtasksChange}
              key={task.title}
              id={index}
            />
          ))}
        </div>
        <div>
          <h3 className="body-md mb-4">Current Status</h3>
          <SelectField
            options={boardColumns}
            currentOption={status}
            onSetStatus={onStatusChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewTask;
