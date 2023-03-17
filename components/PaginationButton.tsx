import { SyntheticEvent } from "react";

type Props = {
  id?: string;
  children: React.ReactNode;
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void;
  selected?: boolean;
  disabled?: boolean;
}

const PaginationButton = ({ children, onClick, selected, disabled, ...extraProps }: Props) => {
  return (
    <button
      {...extraProps}
      type="button"
      aria-label="pagination-button"
      onClick={onClick}
      disabled={disabled}
      className={`bg-gray-300 rounded-md text-lg text-black font-semibold px-3 py-1 ${
        selected ? 'bg-blue-600 text-white' : null
      } ${disabled ? 'cursor-not-allowed' : 'hover:bg-gray-400'}`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
