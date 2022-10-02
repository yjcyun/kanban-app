import { nanoid } from "@reduxjs/toolkit";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Modal from "@ui/modal";
import ModalTitle from "@components/ui/modal-title";
import FormControl from "@components/form/form-control";
import Button from "@components/ui/button";
import { BoardType, ModalType } from "@type/data";
import { ReactComponent as CloseIcon } from "@assets/icon-cross.svg";
import { useAppDispatch } from "@hooks/useStore";
import { closeModal } from "@store/modal-slice";
import { addBoard, setBoardColumns } from "@store/task-slice";
import { selectTab } from "@store/board-slice";

const AddBoard = ({ currentBoard }: ModalType) => {
  const dispatch = useAppDispatch();

  const {
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      id: nanoid(),
      name: "",
      columns: [
        { id: nanoid(), name: "Todo", tasks: [] },
        { id: nanoid(), name: "Doing", tasks: [] },
      ],
    },
  });

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
    dispatch(addBoard({ currentBoard, newBoard: data }));
    dispatch(selectTab(data.name));
    dispatch(setBoardColumns(data.name));
    dispatch(closeModal());
  };

  return (
    <Modal>
      <ModalTitle title="Add New Board" />
      <form className="space-y-6 mt-6" onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Name">
          <input
            type="text"
            className={`input-field ${errors.name ? "border-red" : ""}`}
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
                    className={`input-field w-full ${
                      errors.columns?.[index]?.name ? "border-red" : ""
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

        <Button type="submit" buttonType="primary">
          Create New Board
        </Button>
      </form>
    </Modal>
  );
};

export default AddBoard;
