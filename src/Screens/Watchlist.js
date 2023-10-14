/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import ArtPlayer from './Player';
import { AnimeApi } from '../backend/Animeapi.ts';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { render } from 'react-dom';
import { HashLoader } from 'react-spinners';

function Watchlist() {
  const { state } = useLocation();
  const episodes = state.episodes;
  console.log('Watchlist page reached with an episodes list : ' + episodes);

  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const episodelink = async (id = episodes[0].id) => {
    try {
      const link = await axios.get(
        `https://api.consumet.org/meta/anilist/watch/${id}`
      );
      setUrl(link.data.sources[2].url);
      setLoading(true);
      return link;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!loading) {
      episodelink();
    }
  }, []);
  {
    loading
      ? console.log('Watchlist : yass we laoded... ' + url)
      : console.log('not laoded yet....');
  }

  function click(id) {
    console.log('clicked : ' + id);
    episodelink(id);
    {
      loading
        ? console.log('Watchlist : yass we laoded... ' + url)
        : console.log('not laoded yet....');
    }
  }

  return (
    <div className=" w-full max-h-screen top-0 bottom-0 left-0 right-0">
      <div className=" mx-auto w-3/4 h-1/2 bg-white">
        {loading ? (
          <>
            <ArtPlayer className="w-auto h-screen" url={url} />
            {/* render(
            <ArtPlayer url={url} />
            ); */}
            <p className=" w-full mx-auto flex justify-center items-center text-2xl font-extrabold text-submain">
              {' '}
              Episodes{' '}
            </p>
            <div className=" flex justify-center items-center w-full mx-auto">
              <div className=" mt-10 pb-10 grid grid-cols-10 gap-5">
                {episodes.map((index) => (
                  <button
                    className=" bg-submain bg-opacity-40 backdrop-blur-2xl rounded-xl px-3 hover:bg-black hover:-translate-y-1 hover:text-white transition-all duration-300"
                    onClick={() => {
                      click(index.id);
                      // Watchlist();
                    }}
                  >
                    Episode {index.number}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <HashLoader
            color="#ffffff"
            size={100}
            style={{ justifyContent: 'center' }}
          />
        )}
      </div>
    </div>
  );
}

export default Watchlist;
