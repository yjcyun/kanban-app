import { ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { closeModal } from "../../store/modal-slice";
import { Subtasks } from "../../types/data";

const completedSubtasks = (subtasks: Subtasks) =>
  subtasks.filter((task) => task.isCompleted).length;

const Modal = () => {
  const { type, data } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const ref = useRef(null);

  useOnClickOutside(ref, () => dispatch(closeModal()));

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-10 bg-[#000000]/50 items-center justify-center ${
        type !== "" ? "flex" : "hidden"
      }`}
    >
      <div
        className="bg-secondary-color w-full mx-4 sm:w-[480px] sm:mx-0 h-fit rounded-md p-8"
        ref={ref}
      >
        {/* View Task */}
        {data && (
          <>
            <h2 className="heading-lg mb-6">{data.title}</h2>
            {data.description && (
              <p className="body-lg mb-6">{data.description}</p>
            )}
            <div>
              <h3 className="body-md">
                Subtasks ({completedSubtasks(data.subtasks)} of{" "}
                {data.subtasks.length})
              </h3>
            </div>
          </>
        )}

        {/* End of View Task */}
      </div>
    </div>
  );
};

export default Modal;
