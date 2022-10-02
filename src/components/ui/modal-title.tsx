type ModalTitleProps = {
  title: string;
  warning?: boolean;
};

const ModalTitle = ({ title, warning = false }: ModalTitleProps) => {
  return (
    <h2 className={`heading-lg ${warning ? "text-red" : "text-black"}`}>
      {title}
    </h2>
  );
};

export default ModalTitle;
