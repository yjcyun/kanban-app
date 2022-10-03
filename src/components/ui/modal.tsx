import { ReactNode, useRef } from "react";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { closeModal } from "@store/modal-slice";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const { type } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const ref = useRef(null);

  useOnClickOutside(ref, () => dispatch(closeModal()));

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-10 bg-[#000000]/50 items-center justify-center px-4 sm:px-0 ${
        type !== "" ? "flex" : "hidden"
      }`}
    >
      <div
        className={`bg-secondary-color w-full  sm:w-[480px] sm:h-fit rounded-md p-6 sm:p-8 `}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
