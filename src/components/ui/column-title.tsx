type ColumnTitleProps = {
  label: string;
  length: number;
  id: number;
};

const ColumnTitle = ({ label, length, id }: ColumnTitleProps) => {
  const mapLabelColour = () => {
    switch (id) {
      case 0:
        return "bg-[#49C4E5]";
      case 1:
        return "bg-[#8471F2]";
      case 2:
        return "bg-[#67E2AE]";
    }
  };

  return (
    <div className="flex items-center gap-3 mb-6">
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
