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
  const [display, setDisplay] = useState(false);
  const { episodeId, animeId } = useParams();
  // const [comments, setComments] = useState([]);

  const getAnimeStream = async () => {
    try {
      const response = await fetch(
        `https://api.amvstr.me/api/v2/stream/${episodeId}`
      );
      const animeData = await response.json();
      if (animeData.code === 200) {
        setData(animeData);
      } else {
        console.error("API call was not successful");
      }
    } catch (err) {
      console.error("Could not fetch anime stream", err);
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

  if (!data) {
    return <div>Loading...</div>;
  }

  const mainPlayerUrl = data?.plyr?.main;
  const backupPlayerUrl = data?.plyr?.backup;

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
                  src={mainPlayerUrl}
                  frameBorder="0"
                  allowFullScreen
                  title={`Main Player - Episode ${episodeId}`}
                ></iframe>
              ) : (
                <iframe
                  src={backupPlayerUrl}
                  allowFullScreen
                  title={`Backup Player - Episode ${episodeId}`}
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
