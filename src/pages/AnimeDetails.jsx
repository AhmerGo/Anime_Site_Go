import { useParams } from "react-router-dom";
import { AniApi } from "../components/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./../components/css/AnimeDetails.css"

export default function AnimeDetails() {
  const [detail, setDetail] = useState([])
  const [watch, setWatch] = useState(' ')
  const { animeId } = useParams()

  const getAnimeDetails = async () => {
    try {
      const api = await fetch (`${AniApi}/meta/anilist/info/${animeId}`)
      const res = await api.json()
      const resArray = [res];
      setDetail(resArray);
      const [firstEp] = res.episodes;
      if (firstEp) {
        setWatch(firstEp.id);
      } else {
        setWatch('');
      }
    } catch (err) {
      console.error(err);
      return { error: 'Could not show anime details'};
    }
  }

  useEffect(() => {
    getAnimeDetails()
  }, [animeId]);

  return (
    <div className="aniDetails">
      {detail.map((animeDetails) => (
      <div key={animeDetails.id}>
        <div className="animeDetails">
          <div className="aniImage">
            <img src={animeDetails.image} 
            alt="aniImage" 
            className='aniImage'
            />
          </div>

          <div className="animeInfo">
            {animeDetails.title.english && animeDetails.title.english ? (
              <p className="animeDetailsTitle">{animeDetails.title.english || animeDetails.title.romaji}</p>
            ) : (
              <p className="animeDetailsTitle">{animeDetails.title.romaji}</p>
            )}
            {watch && (
              <Link to={`/watch/${watch}/${animeId}`}>
                <button className="playButton">Play</button>
              </Link>
            )}
            <div className="animeStory">
              <div className="animeSummary">About:</div>
              <p dangerouslySetInnerHTML={{ __html: animeDetails.description }}></p>
            </div>
            <section className="detailContainer">
              <div className="animeEp">
                <div className="animeEpList">
                  {animeDetails.episodes.map((watchEp) => {
                    return (
                      <Link key={watchEp.id} to={`/watch/${watchEp.id}/${animeId}`}>
                        <button>{watchEp.number}</button>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      ))}
    </div>
  
  )
}