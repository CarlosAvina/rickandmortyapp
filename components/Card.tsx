const Card = (props) => {
  return (
    <div
      {...props}
      className="bg-white border-2 border-black text-black rounded-lg p-5 shadow-xl"
    >
      {props.children}
    </div>
  );
};

export default Card;
