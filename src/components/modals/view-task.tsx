import { useState, useRef } from "react";
import { ModalType, Subtasks } from "@type/data";
import SubtaskCheckbox from "@components/form/subtask-checkbox";
import Select from "@components/form/select";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { ReactComponent as VerticalIcon } from "@assets/icon-vertical-ellipsis.svg";
import { openModal } from "@store/modal-slice";
import { updateTask } from "@store/task-slice";

const completedSubtasks = (subtasks: Subtasks) =>
  subtasks.filter((task) => task.isCompleted).length;

const ViewTask = ({ data, currentBoard }: ModalType) => {
  const { description, title, status, subtasks } = data!;

  const [tasks, setTasks] = useState(data!);
  const [dropMore, setDropMore] = useState(false);

  const { boardColumns } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  // Close view more dropbox
  const ref = useRef(null);
  useOnClickOutside(ref, () => setDropMore(false));

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
          <button
            className="relative px-3 -mr-3 group"
            ref={ref}
            onClick={() => setDropMore(!dropMore)}
          >
            <VerticalIcon className="group-hover:fill-main-purple" />
            <div
              className={`absolute w-[192px] mt-6 left-0 -translate-x-1/2 shadow-dropbox rounded-lg p-4 bg-white body-lg text-left space-y-4 ${
                dropMore ? "block" : "hidden"
              }`}
            >
              <p onClick={onEditTask}>Edit Task</p>
              <p className="text-red" onClick={onDeleteTask}>
                Delete Task
              </p>
            </div>
          </button>
        </div>
        {description && <p className="body-lg">{description}</p>}
        <div>
          <h3 className="body-md mb-4">
            Subtasks ({completedSubtasks(subtasks)} of {subtasks.length})
          </h3>
          {tasks.subtasks.map((task, index) => (
            <SubtaskCheckbox
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
          <Select
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
