import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { ReactComponent as CloseIcon } from "@assets/icon-cross.svg";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";
import Button from "@ui/button";
import SelectField from "@components/form/select-field";
import FormControl from "@components/form/form-control";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { ModalType, TaskType } from "@type/data";
import { updateTask } from "@store/task-slice";
import { closeModal } from "@store/modal-slice";

const EditTask = ({ currentBoard, data }: ModalType) => {
  const { boardColumns } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  console.log(data);
  const {
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TaskType>({
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

  const status = getValues().status;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit: SubmitHandler<TaskType> = (data) => {
    dispatch(updateTask({ currentBoard, prevTask: data, updatedTask: data }));
    dispatch(closeModal());
  };

  const onAddSubtask = () => {
    if (fields.length > 5) return;
    append({ title: "", isCompleted: false });
  };

  const onDeleteSubtask = (id: number) => {
    remove(id);
  };

  const onSetStatus = (status: string) => {
    setValue("status", status);
  };

  return (
    <Modal>
      <ModalTitle title="Edit Task" />
      <form className="space-y-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Title">
          <input
            type="text"
            className={`input-field ${errors.title ? "border-red" : ""}`}
            {...register("title", {
              required: true,
            })}
          />
          {errors.title && (
            <span className="body-lg absolute right-4 top-1/2 text-red">
              Can't be empty
            </span>
          )}
        </FormControl>
        <FormControl label="Description">
          <textarea
            className="textarea-field"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            {...register("description")}
          />
        </FormControl>
        <FormControl label="Subtasks">
          <div className="space-y-3">
            {fields.map((_, index) => (
              <div className="flex items-center gap-4" key={index}>
                <div className="relative w-full">
                  <input
                    type="text"
                    className={`input-field w-full ${
                      errors.subtasks?.[index]?.title ? "border-red" : ""
                    }`}
                    placeholder="e.g. Make coffee"
                    {...register(`subtasks.${index}.title`, {
                      required: true,
                    })}
                  />
                  {errors.subtasks?.[index]?.title && (
                    <span className="body-lg absolute right-4 top-[20%] text-red">
                      Can't be empty
                    </span>
                  )}
                </div>
                <button type="button" onClick={() => onDeleteSubtask(index)}>
                  <CloseIcon />
                </button>
              </div>
            ))}
            <Button
              buttonType="secondary"
              type="button"
              onClick={onAddSubtask}
              disabled={fields.length > 5}
            >
              + Add New Subtask
            </Button>
          </div>
        </FormControl>
        <FormControl label="Status">
          <SelectField
            options={boardColumns}
            currentOption={status ? status : boardColumns[0]}
            onSetStatus={onSetStatus}
          />
        </FormControl>

        <Button type="submit" buttonType="primary">
          Save Changes
        </Button>
      </form>
    </Modal>
  );
};

export default EditTask;
