import rickandmortylogo from "public/rickandmortylogo.png";
import Link from "next/link";
import Image from "next/image";

const Navigation = ({ page }: { page: number }) => {
  return (
     <header className="flex col-start-1 col-end-9 items-center justify-center gap-3 md:justify-between py-5 px-10 md:px-20">
      <Image className='h-10 w-10 md:h-24 md:w-24' src={rickandmortylogo} alt="rick_and_morty_logo" />
        <nav className="gap-10 font-bold text-2xl hidden md:flex">
          <Link className='hover:underline' href={`/characters/page/${page || 1}`}>Characters</Link>
          <Link className='hover:underline' href="/episodes/list">Episodes</Link>
          <Link className='hover:underline' href="/locations">Locations</Link>
        </nav>
        <h1 className="font-bold text-2xl md:hidden">Rick & Morty App</h1>
    </header>
  );
}

export default Navigation;
