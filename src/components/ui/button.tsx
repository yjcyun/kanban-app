import { ButtonHTMLAttributes } from "react";

type ButtonType = "primary" | "secondary" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonType;
  size?: "large" | "small";
  classNames?: string;
}

const Button = ({
  buttonType,
  size = "small",
  classNames,
  ...props
}: ButtonProps) => {
  const mapTypeStyle = () => {
    switch (buttonType) {
      case "secondary":
        return "bg-main-purple/10 text-main-purple hover:bg-main-purple/25 dark:bg-white dark:text-main-purple dark:hover:bg-white";
      case "destructive":
        return "bg-red text-white hover:bg-red-hover";
      case "primary":
      default:
        return `bg-main-purple text-white  hover:bg-main-purple-hover dark:hover:bg-main-purple`;
    }
  };

  const mapSizeStyle = () => {
    switch (size) {
      case "large":
        return "heading-lg py-3.5 px-6";
      case "small":
      default:
        return `body-lg font-bold py-2`;
    }
  };

  return (
    <button
      className={`rounded-3xl w-full disabled:bg-main-purple/25
      dark:disabled:text-main-purple/25
      disabled:cursor-not-allowed ${mapSizeStyle()} ${mapTypeStyle()} ${classNames}`}
      {...props}
    />
  );
};

export default Button;
