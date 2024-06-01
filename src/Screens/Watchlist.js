import React, { useState, useEffect } from "react";
import ArtPlayer from "./Player";
// Remove AnimeApi if it's unused
import axios from "axios";
import { useLocation } from "react-router-dom";
// Remove render if it's unused
import { HashLoader } from "react-spinners";

function Watchlist() {
  const { state } = useLocation();
  const episodes = state.episodes;
  const [startingIndex, setStartingIndex] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const displayEpisodes = episodes.slice(startingIndex, startingIndex + 35);
  const numColumns = displayEpisodes.length < 10 ? displayEpisodes.length : 10; // Determine the number of columns

  console.log("Watchlist page reached with an episodes list : ", episodes);

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true); // Set initial state to true to show loader

  const episodelink = async (id = episodes[0].id) => {
    setLoading(true); // Set loading to true when starting a new request
    try {
      const response = await axios.get(
        `https://api.amvstr.me/api/v2/stream/${id}`
      );
      // Assuming the new API response structure is as you provided, you need to adjust the URL path
      const streamUrl = response.data.stream.multi.main.url;
      setUrl(streamUrl);
    } catch (error) {
      console.error("Error fetching episode link: ", error);
    } finally {
      setLoading(false); // Hide loader after request is completed
    }
  };

  useEffect(() => {
    episodelink(); // Fetch the initial episode link on component mount
  }, []); // Empty dependency array means this useEffect runs once when component mounts

  const handleClick = (id, episode) => {
    console.log("clicked : " + id);
    console.log("current ep: " + episode);
    setCurrentEpisode(episode);

    episodelink(id);
  };

  return (
    <div className="w-full max-h-screen top-0 bottom-0 left-0 right-0">
      <div className="mx-auto w-3/4 h-1/2 bg-white">
        {loading ? (
          <HashLoader
            color="#ffffff"
            size={100}
            style={{ display: "flex", justifyContent: "center" }}
          />
        ) : (
          <>
            <ArtPlayer className="w-auto h-screen" url={url} />
            <p className="w-full mx-auto flex justify-center items-center text-2xl font-extrabold text-submain">
              Episodes
            </p>
            <div className="flex justify-center items-center w-full mx-auto">
              <button
                onClick={() => {
                  if (startingIndex > 0) setStartingIndex(startingIndex - 35);
                }}
                className="mr-5 bg-submain bg-opacity-40 backdrop-blur-2xl rounded-full w-10 h-10 flex justify-center items-center hover:bg-black hover:text-white transition-all duration-300"
              >
                ←
              </button>

              <div
                className={`mt-10 pb-10 grid gap-5 ${
                  numColumns === 10 ? "grid-cols-10" : `grid-cols-${numColumns}`
                }`}
              >
                {episodes
                  .slice(startingIndex, startingIndex + 35)
                  .map((episode, index) => (
                    <button
                      key={index}
                      className={`bg-submain bg-opacity-40 backdrop-blur-2xl rounded-xl px-3 
                      ${
                        currentEpisode === episode.episode
                          ? "bg-highlightColor"
                          : ""
                      } 
                      hover:bg-black hover:-translate-y-1 hover:text-white transition-all duration-300`}
                      onClick={() => handleClick(episode.id, episode.episode)}
                    >
                      Episode {episode.episode}
                    </button>
                  ))}
              </div>

              <button
                onClick={() => {
                  if (startingIndex + 35 < episodes.length)
                    setStartingIndex(startingIndex + 35);
                }}
                className="ml-5 bg-submain bg-opacity-40 backdrop-blur-2xl rounded-full w-10 h-10 flex justify-center items-center hover:bg-black hover:text-white transition-all duration-300"
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
