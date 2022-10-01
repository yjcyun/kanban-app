import { ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const [openModal, setOpenModal] = useState(true);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpenModal(false));

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-10 bg-[#000000]/50 items-center justify-center ${
        openModal ? "flex" : "hidden"
      }`}
    >
      <div
        className="bg-secondary-color w-full mx-4 sm:w-[480px] sm:mx-0 h-fit rounded-md p-8"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
