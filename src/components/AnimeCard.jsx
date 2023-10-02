import { Link } from 'react-router-dom';

export default function AnimeCard(props) {

  return (
    <>
      <div className="animeCard">
        <div className="animeCardHead">
          <Link to={`/anime-details/${props.rec.id}`} onClick={() => {
            props.handleCLick();
          }}>
            <img src={props.rec.image} 
            alt={props.rec.id}
            className="animeImage" />
          </Link>
          <div className="animeCardDetails">
            <div className="totalEpisodes">
              <span>{(props.rec.type)}</span>
              <span>{(props.rec.rating / 10)}</span>
            </div>
            {props?.rec?.title?.english && props?.rec?.title?.english ? (
              <h5 className="animeCardTitle">{props?.rec?.title?.english}</h5>
            ) : (
              <p className="animeCardTitle">{props?.rec?.title?.romaji}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
 
}