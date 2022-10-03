import Button from "@components/ui/button";
import { useAppDispatch } from "@hooks/useStore";
import { openModal } from "@store/modal-slice";

const EmptyBoard = () => {
  const dispatch = useAppDispatch();

  const onAddColumn = () => {
    dispatch(openModal({ type: "add-column" }));
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="heading-lg mb-8 text-center">
        This board is empty. Create a new column to get started.
      </h1>
      <Button
        type="button"
        buttonType="primary"
        classNames="w-auto px-[18px]"
        onClick={onAddColumn}
      >
        + Add New Column
      </Button>
    </div>
  );
};

export default EmptyBoard;
