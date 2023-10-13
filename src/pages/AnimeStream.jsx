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
          <h1>
            {streamData.info.title} - Episode {streamData.info.episode}
          </h1>
        </div>
        <div className="animeVideo">
          {/* The iframe src URL can be streamData.stream.iframe.default, streamData.stream.plyr.main, or any other URL you prefer. Adjust as necessary. */}
          <iframe
            src={streamData.stream.plyr.main}
            frameBorder="0"
            allowFullScreen={true}
            title={`${streamData.info.title} Episode ${streamData.info.episode}`}
            allow="autoplay; picture-in-picture"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
          ></iframe>
        </div>
        {/* Add any additional components or information you want to render */}
      </div>
    </div>
  );
};

export default AnimeStream;
