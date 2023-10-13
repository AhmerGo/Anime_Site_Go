import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./../components/css/AnimeStream.css";
// import DiscussionPage from "./DiscussionPage";
import { AniApi } from "../components/api";

const AnimeStream = () => {
  const { episodeId, animeId } = useParams();
  const [animeDetails, setAnimeDetails] = useState({});
  const [streamData, setStreamData] = useState({});
  const [displayMain, setDisplayMain] = useState(true); // state to toggle between main and backup stream

  useEffect(() => {
    const getAnimeDetails = async () => {
      try {
        const response = await axios.get(
          `${AniApi}/meta/anilist/info/${animeId}`
        );
        setAnimeDetails(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const getAnimeStream = async () => {
      try {
        const response = await axios.get(
          `https://api.amvstr.me/api/v2/stream/${episodeId}`
        );
        if (response.data.code === 200) {
          setStreamData(response.data);
        } else {
          throw new Error("Could not retrieve anime stream data");
        }
      } catch (err) {
        console.error(err);
      }
    };

    getAnimeDetails();
    getAnimeStream();
  }, [animeId, episodeId]); // dependencies for the useEffect

  const toggleStream = () => {
    setDisplayMain((prev) => !prev); // toggle between main and backup stream
  };

  return (
    <div className="animeStream">
      <div className="animeStreamContainer">
        {/* Conditional rendering to handle if the data is not yet received */}
        {streamData.info && (
          <>
            <div className="animeTitle">
              <span>{streamData.info.title}</span>
            </div>
            <div className="animeVideo">
              <iframe
                src={
                  displayMain
                    ? streamData.stream.plyr.main
                    : streamData.stream.plyr.backup
                }
                frameBorder="0"
                allowFullScreen={true}
                title={`Episode ${streamData.info.episode}`}
                allow="autoplay; picture-in-picture"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
              ></iframe>
            </div>
            <button onClick={toggleStream}>
              Switch to {displayMain ? "Backup" : "Main"} Stream
            </button>
            {/* Other components */}
          </>
        )}
      </div>
      {/* <DiscussionPage /> */}
    </div>
  );
};

export default AnimeStream;
