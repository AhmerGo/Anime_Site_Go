import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./../components/css/AnimeStream.css";
// import DiscussionPage from "./DiscussionPage";
import { AniApi } from "../components/api";

const AnimeStream = () => {
  const { episodeId, animeId } = useParams();
  const [data, setData] = useState(null);
  const [details, setDetails] = useState({});
  const [player, setPlayer] = useState(null);
  const [display, setDisplay] = useState(false);
  // const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAnimeDetails = async () => {
      try {
        const response = await fetch(`${AniApi}/meta/anilist/info/${animeId}`);
        const animeDetails = await response.json();
        setDetails(animeDetails);
      } catch (err) {
        console.error(err);
      }
    };

    const getAnimeStream = async () => {
      try {
        const response = await axios.get(
          `https://api.amvstr.me/api/v2/stream/${episodeId}`
        );
        const animeVid = response.data;
        if (animeVid.code === 200) {
          setPlayer(animeVid.stream.plyr.main);
          setData(animeVid.stream.plyr.backup);
        } else {
          throw new Error("Could not retrieve anime stream data");
        }
      } catch (err) {
        console.error(err);
      }
    };

    getAnimeDetails();
    getAnimeStream();
    // eslint-disable-next-line
  }, [animeId, episodeId]);

  const toggleDisplay = () => {
    setDisplay((prevDisplay) => !prevDisplay);
  };

  return (
    <div className="animeStream" key={episodeId}>
      <div className="animeStreamContainer">
        <div className="animeTitle">
          <span>{details.info?.title}</span>
        </div>
        <div className="animeSource">
          <i className="playerArrow" onClick={toggleDisplay}></i>
          <i className="server" onClick={toggleDisplay}></i>
        </div>
        <div className="animeVideoList">
          <div className="animeVideo">
            <iframe
              src={display ? player : data}
              frameBorder="0"
              allowFullScreen={true}
              title={`Episode ${details.info?.episode}`}
              allow="autoplay; picture-in-picture"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
            ></iframe>
          </div>
          <div className="epListContainer">
            <div className="epList">
              {details.info?.episodes?.map((ep) => (
                <Link to={`/watch/${ep.id}/${animeId}`} key={ep.id}>
                  <button className={ep.id === episodeId ? "active" : ""}>
                    {ep.number}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <DiscussionPage /> */}
    </div>
  );
};

export default AnimeStream;
