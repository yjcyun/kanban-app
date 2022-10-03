import { useFieldArray, SubmitHandler, useFormContext } from "react-hook-form";
import { ReactComponent as CloseIcon } from "@assets/icon-cross.svg";
import Button from "@ui/button";
import SelectField from "@components/form/select-field";
import FormControl from "@components/form/form-control";
import { useAppDispatch } from "@hooks/useStore";
import { TaskType } from "@type/data";
import { closeModal } from "@store/modal-slice";

interface TaskFormProps {
  mode: "add" | "edit";
  onSubmitHandler: (data: TaskType) => void;
  boardColumns: string[];
}

const TaskForm = ({ mode, onSubmitHandler, boardColumns }: TaskFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
    handleSubmit,
  } = useFormContext<TaskType>();

  const { status } = getValues();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

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

  const onSubmit: SubmitHandler<TaskType> = (data) => {
    onSubmitHandler(data);
    dispatch(closeModal());
  };

  return (
    <form className="space-y-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
      <FormControl label="Title">
        <input
          type="text"
          className={`input-field ${
            errors.title ? "border-red focus:border-red" : ""
          }`}
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
                  className={`input-field ${
                    errors.subtasks?.[index]?.title
                      ? "border-red focus:border-red"
                      : ""
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
                <CloseIcon
                  className={`${
                    errors.subtasks?.[index]?.title ? "fill-red" : ""
                  }`}
                />
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
        {mode === "add" ? "Create Task" : "Save Changes"}
      </Button>
    </form>
  );
};

export default TaskForm;
