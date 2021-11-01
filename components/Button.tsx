import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const Button = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  const { children, onClick, disabled, className, ...extraProps } = props;
  return (
    <button
      className={`w-1/2 flex items-center justify-center rounded-md text-white px-2 py-1 ${
        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black'
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...extraProps}
    >
      {children}
    </button>
  );
};

export default Button;
