import React from "react";
import AnimeCard from "../components/AnimeCard";
import { useFetchInitialData } from "../utilities/hooks";
import { useRef } from "react";

export default function Popular(props) {
  const handleClick = () => {
    props.handleClick();
  };

  const ref = useRef(null);

  const { popular } = props;
  useFetchInitialData(popular, ref)

  return (
    <>
      <h2>Popular Anime</h2>
      <div className="animeGrid" ref={ref}>
        {props.popular.map((rec) => (
          <AnimeCard rec={rec} key={rec.id} handleClick={handleClick} />
        ))}
      </div>
    </>
  )
}