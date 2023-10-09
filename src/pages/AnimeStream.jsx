import { useParams, Link } from "react-router-dom";
import { AniApi } from "../components/api";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
// import DiscussionPage from "./DiscussionPage";
import "./../components/css/AnimeStream.css";

export default function AnimeStream() {
  const [data, setData] = useState("");
  const [details, setDetails] = useState({});
  const [player, setPlayer] = useState("");
  const [display, setDisplay] = useState(false);
  const { episodeId, animeId } = useParams();
  // const [comments, setComments] = useState([]);

  const getAnimeStream = async () => {
    try {
      const animeVid = await axios.get(
        `https://api.amvstr.ml/api/v2/stream/${episodeId}`
      );
      console.log(animeVid);
      setPlayer(animeVid?.data?.data?.player?.main);
      setData(animeVid?.data?.data?.plyr?.backup);
      console.log(episodeId, animeId);
      //  const response = await axios.get(`/api/discussions?episodeId=${episodeId}`);
      //  setComments(response.data.discussions);
    } catch (err) {
      console.error(err);
      return { error: "Could not show anime stream" };
    }
  };

  const handleDisplay = () => {
    setDisplay(false);
  };

  const handlePlayer = () => {
    setDisplay(true);
  };
  const getAnimeDetails = async () => {
    try {
      const api = await fetch(`${AniApi}/meta/anilist/info/${animeId}`);
      const res = await api.json();
      setDetails(res);
    } catch (err) {
      console.error(err);
      return { error: "Could not show anime details" };
    }
  };
  useEffect(() => {
    getAnimeDetails();
    getAnimeStream();
    // eslint-disable-next-line
  }, [animeId, episodeId]);
  return (
    <>
      <div className="animeStream" key={episodeId}>
        <div className="animeStreamContainer">
          <div className="animeTitle">
            <span>{details.title?.romaji}</span>
          </div>
          <div className="animeSource">
            <i className="playerArrow" onClick={handleDisplay}></i>
            <i className="server" onClick={handlePlayer}></i>
          </div>
          <div className="animeVideoList">
            <div className="animeVideo">
              {display ? (
                <iframe
                  src={player}
                  frameBorder="0"
                  allowFullScreen="allowfullscreen"
                  title={episodeId}
                  allow="picture-in-picture"
                  webkitallowfullscreen="true"
                ></iframe>
              ) : (
                <iframe
                  src={data}
                  allowFullScreen="allowfullscreen"
                  title={episodeId}
                  allow="picture-in-picture"
                  webkitallowfullscreen="true"
                ></iframe>
              )}
            </div>
            <div className="epListContainer">
              <div className="epList">
                {details?.episodes?.map((ep) => (
                  <Link to={`/watch/${ep.id}/${animeId}`} key={ep.id}>
                    {ep.id === episodeId ? (
                      <button className="active">{ep.number}</button>
                    ) : (
                      <button>{ep.number}</button>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <DiscussionPage /> */}
    </>
  );
}
