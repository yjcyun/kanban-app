import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Modal from "../ui/modal";
import ModalTitle from "../ui/modal-title";
import { ReactComponent as CloseIcon } from "../../assets/icon-cross.svg";
import Button from "../ui/button";
import Select from "../form/select";
import { useAppSelector } from "../../hooks/useStore";
import FormControl from "../form/form-control";
import { TaskType } from "../../types/data";
import { nanoid } from "@reduxjs/toolkit";

const AddTask = () => {
  const { boardColumns } = useAppSelector((state) => state.tasks);

  const {
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TaskType>({
    defaultValues: {
      id: nanoid(),
      title: "",
      description: "",
      subtasks: [{ title: "", isCompleted: false }],
      status: boardColumns[0],
    },
  });

  const status = getValues().status;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSubmit: SubmitHandler<TaskType> = (data) => {
    console.log(data);
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
      <ModalTitle title="Add New Task" />
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
          <Select
            options={boardColumns}
            currentOption={status ? status : boardColumns[0]}
            onSetStatus={onSetStatus}
          />
        </FormControl>

        <Button type="submit" buttonType="primary">
          Create Task
        </Button>
      </form>
    </Modal>
  );
};

export default AddTask;
