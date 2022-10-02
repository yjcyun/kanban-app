import Modal from "../ui/modal";
import ModalTitle from "../ui/modal-title";
import { ReactComponent as CloseIcon } from "../../assets/icon-cross.svg";
import Button from "../ui/button";
import Select from "../form/select";
import { useAppSelector } from "../../hooks/useStore";
import FormControl from "../form/form-control";

const AddTask = () => {
  const { boardColumns } = useAppSelector((state) => state.tasks);

  return (
    <Modal>
      <ModalTitle title="Add New Task" />
      <form className="space-y-6 mt-6">
        <FormControl label="Title">
          <input type="text" className="input-field" />
        </FormControl>
        <FormControl label="Description">
          <textarea
            className="textarea-field"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          />
        </FormControl>
        <FormControl label="Subtasks">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <input
                type="text"
                className="input-field w-full"
                placeholder="e.g. Make coffee"
              />
              <button type="button">
                <CloseIcon />
              </button>
            </div>
            <Button buttonType="secondary" type="button">
              + Add New Subtask
            </Button>
          </div>
        </FormControl>

        <div className="flex flex-col">
          <label htmlFor="" className="body-md mb-2">
            Status
          </label>
          <Select options={boardColumns} currentOption={boardColumns[0]} />
        </div>

        <Button type="submit" buttonType="primary">
          Create Task
        </Button>
      </form>
    </Modal>
  );
};

export default AddTask;
