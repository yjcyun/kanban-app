import { useState, useRef } from "react";
import Modal from "../ui/modal";
import { Subtasks, TaskType } from "../../types/data";
import SubtaskCheckbox from "../form/subtask-checkbox";
import Select from "../form/select";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { ReactComponent as VerticalIcon } from "../../assets/icon-vertical-ellipsis.svg";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import ModalTitle from "../ui/modal-title";
import { openModal } from "../../store/modal-slice";
type ViewTaskProps = {
  data: TaskType;
};

const completedSubtasks = (subtasks: Subtasks) =>
  subtasks.filter((task) => task.isCompleted).length;

const ViewTask = ({ data }: ViewTaskProps) => {
  const { description, title, status, subtasks } = data;

  const [tasks, setTasks] = useState(data);
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
    // TODO: Update redux state
  };

  const onDeleteTask = () => {
    dispatch(openModal({ type: "delete-task" }));
  };

  return (
    <Modal>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-6">
          <ModalTitle title={title} />
          <button className="relative" ref={ref}>
            <VerticalIcon onClick={() => setDropMore(!dropMore)} />
            <div
              className={`absolute w-[192px] mt-6 left-0 -translate-x-1/2 shadow-dropbox rounded-lg p-4 bg-white body-lg text-left space-y-4 ${
                dropMore ? "block" : "hidden"
              }`}
            >
              <p>Edit Task</p>
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
            onSetStatus={() => null}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ViewTask;
