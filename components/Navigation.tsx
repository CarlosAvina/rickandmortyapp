import rickandmortylogo from "public/rickandmortylogo.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Navigation = ({ page }: { page?: number }) => {
  const router = useRouter();
  const pathname = router.pathname;

  function isCurrentPage(pageName: string, currentPathname: string) {
    return currentPathname.includes(pageName);
  }

  return (
    <header className="flex col-start-1 col-end-9 items-center justify-center gap-3 md:justify-between py-5 px-10 md:px-20">
      <Image className='h-10 w-10 md:h-24 md:w-24' src={rickandmortylogo} alt="rick_and_morty_logo" />
      <nav className="gap-10 font-bold text-2xl hidden md:flex">
        <Link className={`hover:underline p-3 rounded-md ${isCurrentPage("characters", pathname) ? "bg-gray-300" : null}`} href={`/characters/page/${page || 1}`}>Characters</Link>
        <Link className={`hover:underline p-3 rounded-md ${isCurrentPage("episodes", pathname) ? "bg-gray-300" : null}`} href="/episodes/list">Episodes</Link>
        <Link className={`hover:underline p-3 rounded-md ${isCurrentPage("locations", pathname) ? "bg-gray-300" : null}`} href="/locations/list">Locations</Link>
      </nav>
      <h1 className="font-bold text-2xl md:hidden">Rick & Morty App</h1>
    </header>
  );
}

export default Navigation;
