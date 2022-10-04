type ModalTitleProps = {
  title: string;
  warning?: boolean;
};

const ModalTitle = ({ title, warning = false }: ModalTitleProps) => {
  return (
    <h2
      className={`heading-lg heading-color ${
        warning ? "text-red dark:text-red" : ""
      }`}
      id="Dialog title"
    >
      {title}
    </h2>
  );
};

export default ModalTitle;
