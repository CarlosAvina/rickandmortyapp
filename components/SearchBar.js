import { Button } from 'components';

const SearchBar = (props) => {
  const { onSubmit, className, ...extraProps } = props;

  return (
    <form className={`flex ${className}`} onSubmit={onSubmit}>
      <input
        className="w-11/12 border-2 border-black rounded-tl-md rounded-bl-md p-2"
        placeholder="Search..."
        {...extraProps}
      />
      <Button
        className="w-1/12 rounded-tr-md rounded-br-md rounded-tl-none rounded-bl-none"
        type="submit"
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
