import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./../components/css/AnimeStream.css";

const AnimeStream = () => {
  const { animeId, episodeId } = useParams();

  const [streamData, setStreamData] = useState({
    info: {
      title: "",
      episode: "",
      id: "",
    },
    stream: {
      plyr: {
        main: "",
        backup: "",
      },
      multi: {
        main: {
          url: "",
          isM3U8: false,
          quality: "",
        },
        backup: {
          url: "",
          isM3U8: false,
          quality: "",
        },
      },
      tracks: {
        file: "",
        kind: "",
      },
      iframe: {
        default: "",
        backup: "",
      },
      nspl: {
        main: "",
        backup: "",
      },
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStreamData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(
          `https://api.amvstr.me/api/v2/stream/${episodeId}`
        );
        if (response.data && response.data.code === 200) {
          setStreamData(response.data);
          setIsLoading(false);
        } else {
          // handle error response
        }
      } catch (error) {
        // handle errors during the request
      }
    };

    fetchStreamData();
  }, [animeId, episodeId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="animeStream">
      <div className="animeStreamContainer">
        <div className="animeTitle">
          <span>{streamData.info.title}</span>
          {/* display other information like episode number or description if needed */}
        </div>
        <div className="animeVideo">
          {/* Use conditional rendering for iframe source */}
          <iframe
            src={streamData.stream.plyr.main || streamData.stream.plyr.backup} // adjusted based on your logic for displaying main or backup
            frameBorder="0"
            allowFullScreen={true}
            title={`Episode ${streamData.info.episode}`}
            allow="autoplay; picture-in-picture"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
          ></iframe>
        </div>
        <div className="epListContainer">
          <div className="epList">
            {/* Conditional rendering for episodes */}
            {streamData.info.episodes.map((ep, index) => (
              <Link to={`/watch/${ep.id}/${animeId}`} key={index}>
                <button
                  className={ep.id === parseInt(episodeId) ? "active" : ""}
                >
                  {ep.number}
                </button>
              </Link>
            ))}
          </div>
        </div>
        {/* You can also display additionalData if needed */}
      </div>
      {/* <DiscussionPage /> */}
    </div>
  );
};

export default AnimeStream;
