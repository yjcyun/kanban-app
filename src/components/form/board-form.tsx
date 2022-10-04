import { nanoid } from "@reduxjs/toolkit";
import { SubmitHandler, useFieldArray, useFormContext } from "react-hook-form";
import FormControl from "@components/form/form-control";
import Button from "@ui/button";
import { BoardType } from "@type/data";
import { ReactComponent as CloseIcon } from "@assets/icon-cross.svg";
import { useAppDispatch } from "@hooks/useStore";
import { closeModal } from "@store/modal-slice";
import { setBoardColumns } from "@store/task-slice";
import { selectTab } from "@store/board-slice";

interface BoardFormProps {
  mode: "add" | "edit";
  onSubmitHandler: (data: BoardType) => void;
}

const BoardForm = ({ mode, onSubmitHandler }: BoardFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<BoardType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const onAddSubtask = () => {
    if (fields.length > 5) return;
    append({ id: nanoid(), name: "", tasks: [] });
  };

  const onDeleteSubtask = (id: number) => {
    remove(id);
  };

  const onSubmit: SubmitHandler<BoardType> = (data) => {
    onSubmitHandler(data);
    dispatch(selectTab(data.name));
    dispatch(setBoardColumns(data.name));
    dispatch(closeModal());
  };

  return (
    <form className="space-y-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
      <FormControl label="Name">
        <input
          type="text"
          className={`input-field ${
            errors.name ? "border-red focus:border-red" : ""
          }`}
          placeholder="e.g. Web Design"
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && (
          <span className="body-lg absolute right-4 top-1/2 text-red">
            Can't be empty
          </span>
        )}
      </FormControl>
      <FormControl label="Columns">
        <div className="space-y-3">
          {fields.map((_, index) => (
            <div className="flex items-center gap-4" key={index}>
              <div className="relative w-full">
                <input
                  type="text"
                  className={`input-field ${
                    errors.columns?.[index]?.name
                      ? "border-red focus:border-red"
                      : ""
                  }`}
                  placeholder="e.g. Done"
                  {...register(`columns.${index}.name`, {
                    required: true,
                  })}
                />
                {errors.columns?.[index]?.name && (
                  <span className="body-lg absolute right-4 top-[20%] text-red">
                    Can't be empty
                  </span>
                )}
              </div>
              <button type="button" onClick={() => onDeleteSubtask(index)}>
                <CloseIcon
                  className={`${
                    errors.columns?.[index]?.name ? "fill-red" : ""
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

      <Button type="submit" buttonType="primary">
        {mode === "add" ? "Create New Board" : "Save Changes"}
      </Button>
    </form>
  );
};

export default BoardForm;
