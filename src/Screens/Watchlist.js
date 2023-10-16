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

  const handleClick = (id) => {
    console.log("clicked : " + id);
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
              <div className="mt-10 pb-10 grid grid-cols-10 gap-5">
                {episodes.map((episode, index) => (
                  <button
                    key={index} // Always add a key when rendering a list
                    className="bg-submain bg-opacity-40 backdrop-blur-2xl rounded-xl px-3 hover:bg-black hover:-translate-y-1 hover:text-white transition-all duration-300"
                    onClick={() => handleClick(episode.id)}
                  >
                    Episode {episode.number}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
