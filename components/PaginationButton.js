const PaginationButton = ({ children, onClick, selected, ...extraProps }) => {
  return (
    <button
      {...extraProps}
      onClick={onClick}
      className={`bg-gray-300 hover:bg-gray-400 rounded-md text-lg text-black font-semibold px-3 py-1 ${
        selected ? "bg-blue-600 text-white" : null
      }`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
