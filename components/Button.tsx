type Props = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({ children, onClick, disabled, className, ...extraProps }: Props) => {
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
