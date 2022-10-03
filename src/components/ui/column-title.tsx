type ColumnTitleProps = {
  label: string;
  length: number;
  id: number;
};

const ColumnTitle = ({ label, length, id }: ColumnTitleProps) => {
  const mapLabelColour = () => {
    switch (id) {
      case 0:
      case 3:
        return "bg-[#49C4E5]";
      case 1:
      case 4:
        return "bg-[#8471F2]";
      case 2:
      case 5:
        return "bg-[#67E2AE]";
    }
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className={`w-[15px] h-[15px] rounded-full ${mapLabelColour()}`}
      ></div>
      <h3 className="heading-sm uppercase">
        {label} {length !== undefined && <span>({length})</span>}
      </h3>
    </div>
  );
};

export default ColumnTitle;
