type ColumnTitleProps = {
  label: string;
  length: number;
};

const ColumnTitle = ({ label, length }: ColumnTitleProps) => {
  const mapLabelColour = () => {
    switch (label) {
      case "todo":
        return "bg-[#49C4E5]";
      case "doing":
        return "bg-[#8471F2]";
      case "done":
        return "bg-[#67E2AE]";
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-[15px] h-[15px] rounded-full ${mapLabelColour()}`}
      ></div>
      <h3 className="heading-sm uppercase">
        {label} {length && <span>({length})</span>}
      </h3>
    </div>
  );
};

export default ColumnTitle;
