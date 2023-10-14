import React, { useRef } from "react";
import { useFetchInitialData } from "../utilities/hooks";
import AnimeCard from "../components/AnimeCard";

export default function RecentAnime(props) {
  // const renderOnCall = useRef(false);
  // const [airing, setAiring] = useState([])
  // const getAiring = async () => {
  //   try {
  //     const api = await fetch (`${AniApi}/meta/anilist/airing-schedule>notYetAired=true`)
  //     const response = await api.json()
  //     setAiring(response.results)
  //   }
  //   catch (error) {
  //     console.log("Anime not found")
  //   }
  // }

  // useEffect(() => {
  //   if (!renderOnCall.current) {
  //     getAiring()
  //   }
  //   renderOnCall.current = true;
  // }, []);
  const { recent, popular, loading, handleClick } = props;

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or any other indicator
  }

  return (
    <>
      <h3 className="categoryTitle">Popular Anime</h3>
      <div className="animeGrid">
        {popular.map((anime) => (
          <AnimeCard rec={anime} key={anime.id} handleClick={handleClick} />
        ))}
      </div>
      <h3 className="categoryTitle">Recent Anime</h3>
      <div className="animeGrid">
        {recent.map((anime) => (
          <AnimeCard rec={anime} key={anime.id} handleClick={handleClick} />
        ))}
      </div>
    </>
  );
}
