import { ReactNode } from "react";

type FormControlProps = {
  children: ReactNode;
  label: string;
};

const FormControl = ({ label, children }: FormControlProps) => {
  return (
    <div className="flex flex-col">
      <label className="body-md mb-2">{label}</label>
      {children}
    </div>
  );
};

export default FormControl;
