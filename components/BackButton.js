import ChevronLeft from "./icons/ChevronLeft";

const BackButton = ({ children = "Back", onClick }) => {
  return (
    <button
      className="flex items-center text-xl font-semibold px-2 py-3 hover:bg-gray-100 rounded-md max-w-min"
      onClick={onClick}
    >
      <ChevronLeft />
      <p className="pr-2 mb-0.5">{children}</p>
    </button>
  );
};

export default BackButton;
