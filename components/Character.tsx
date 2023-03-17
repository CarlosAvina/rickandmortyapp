import Image from 'next/image';
import { useRouter } from 'next/router';

import { Card, Button } from './';

const Character = ({ character }) => {
  const router = useRouter();

  const { id, image, name, status, origin, location, episode } = character;

  function goOrigin() {
    if (origin.id) {
      router.push(`/location/${origin.id}`);
    }
  }

  function goLocation() {
    if (location.id) {
      router.push(`/location/${location.id}`);
    }
  }

  function goEpisodes() {
    const ids = episode.map((e) => e.id);
    router.push({ pathname: '/episodes/[ids]', query: { ids } });
  }

  return (
    <Card key={id}>
      <Image src={image} width={100} height={100} alt="rick_and_morty_character_photo" />
      <p className="font-bold text-2xl max-w-min md:max-w-max">{name}</p>
      <b>{status}</b>
      <p className="max-w-min md:max-w-max">{origin.name}</p>
      <section className="flex flex-col md:flex-row gap-3 mt-5">
        <Button onClick={goOrigin} disabled={!origin.id}>
          Origin
        </Button>
        <Button onClick={goLocation} disabled={!location.id}>
          Location
        </Button>
        <Button onClick={goEpisodes}>Episodes</Button>
      </section>
    </Card>
  );
};

export default Character;
