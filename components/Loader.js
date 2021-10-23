import Image from "next/image";
import rickmortyLoader from "public/rickandmortyportal.png";

const Loader = () => {
  return (
    <figure className="h-screen grid justify-center items-center">
      <Image
        className="animate-spin"
        src={rickmortyLoader}
        width={300}
        height={300}
      />
    </figure>
  );
};

export default Loader;
