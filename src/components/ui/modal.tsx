import { ReactNode, useRef } from "react";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { closeModal } from "@store/modal-slice";
import { ReactComponent as CloseIcon } from "@assets/icon-cross.svg";
import { useEffect } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const { type } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const ref = useRef(null);

  const onCloseModal = () => dispatch(closeModal());

  useOnClickOutside(ref, onCloseModal);

  const getAllFocusableElements = (parent: HTMLElement) => {
    if (!parent) {
      return [];
    }
    return parent.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
    );
  };

  const onKeyListener = (event: any) => {
    const focusableModalElements = getAllFocusableElements(ref.current!);

    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (event.code === "Tab") {
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        (lastElement as HTMLElement).focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        (firstElement as HTMLElement).focus();
      }
    }

    if (event.code === "Escape") {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    const focusableModalElements = getAllFocusableElements(ref.current!);
    const firstElement = focusableModalElements[0];

    (firstElement as HTMLElement).focus();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-10 bg-[#000000]/50 items-center justify-center px-4 sm:px-0 ${
        type !== "" ? "flex" : "hidden"
      }`}
      role="dialog"
      aria-labelledby="Dialog title"
      aria-describedby="Dialog description"
      onKeyDown={onKeyListener}
    >
      <div
        className={`bg-secondary-color w-full sm:w-[480px] max-h-[450px] overflow-y-auto sm:max-h-fit sm:h-fit sm:overflow-visible rounded-md p-6 sm:p-8 relative`}
        ref={ref}
      >
        <button
          className="absolute -right-8 -top-8"
          aria-label="close"
          title="Close"
          onClick={onCloseModal}
        >
          <CloseIcon className="fill-main-purple" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
