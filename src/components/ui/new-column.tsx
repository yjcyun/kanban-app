import { useAppDispatch } from "@hooks/useStore";
import { openModal } from "@store/modal-slice";

const NewColumn = () => {
  const dispatch = useAppDispatch();

  const onEditBoard = () => {
    dispatch(openModal({ type: "add-column" }));
  };

  return (
    <button
      className="bg-new-column rounded-md h-full w-full flex items-center justify-center hover:text-main-purple"
      onClick={onEditBoard}
    >
      <h2 className="heading-xl">+ New Column</h2>
    </button>
  );
};

export default NewColumn;
