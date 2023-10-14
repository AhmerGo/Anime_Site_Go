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
  const ref = useRef(null);

  const handleClick = () => {
    props.handleClick();
  };

  const { recent } = props;

  useFetchInitialData(recent, ref)

  return (
    <>
      <h3 className="categoryTitle">Popular Anime</h3>
      <div className="animeGrid">
          {props.popular.map((rec) => (
            <AnimeCard rec={rec} key={rec.id} handleClick={handleClick} />
          ))}
          </div>
      <h3 className="categoryTitle">Recent Anime</h3>
      <div className="animeGrid">
        {props.recent && props.recent.map((rec) => (
          <AnimeCard rec={rec} key={rec.id} handleClick={handleClick} />
        ))}
      </div>
    </>
  )
}