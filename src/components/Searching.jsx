import AnimeCard from "./AnimeCard";

export default function Searching(props) {
  const handleClick = () => {
    props.handleClick();
  };

  return (
    <>
      {Object.keys(props.search).length === 0 ? (
        <div>
          <h3>Anime Not Found</h3>
          <br />
        </div>
      ) : (
        <div>
          <div className="animeGrid">
            {props.search?.results?.map((rec) => (
              <AnimeCard rec={rec} key={rec.id} ep="false" handleClick={handleClick} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}