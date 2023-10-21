import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
// import { SwiperSlide } from 'swiper/react';
import { AnimeApi } from "../backend/Animeapi.ts";
// import { Swiper } from 'swiper/react';
// import {
//   Pagination,
//   Scrollbar,
//   A11y,
//   Mousewheel,
//   Autoplay,
//   EffectCoverflow,
// } from 'swiper';

function Description() {
  const { state } = useLocation();
  const id = state.id;
  const index = state.index;
  const a = state.title;
  console.log("description page reached " + id);
  console.log("epiiiiiiiiii " + index);
  console.log("epiiiiiiiiii " + a);

  const [info, setInfo] = useState([]);

  const [loading, setLoading] = useState(false);
  console.log(loading);
  const getinfo = async () => {
    try {
      const data = await AnimeApi.getInfo(id);
      setInfo(data);
      setLoading(true);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (info.length === 0) {
      getinfo();
    }
  }, [info.length]);

  if (loading === true) {
    console.log("Description : yass we laoded...");
    console.log(info.title.romaji);
  } else console.log("not laoded yet....");

  const navigate = useNavigate();
  function callPlayer(episodes) {
    console.log("watchlist called with episode list : " + info.episodes);
    navigate("/watchlist", { state: { episodes: info.episodes } });
  }

  // setTimeout(10000)
  return (
    <>
      <div
        className={` h-screen text-white flex items-center justify-center `}
        style={{
          backgroundImage: `url(${info.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {loading ? (
          <>
            {/* <img src={info.cover} className=" static  z-20"  />  */}
            <div className=" gap-10 bg-black bg-opacity-40 backdrop-blur-2xl rounded-3xl w-full h-full grid grid-rows-4 items-center text-center justify-center z-40">
              <div className=" text-4xl font-rubik font-thin">
                {info.title.romaji}
              </div>
              <div>{info.description}</div>
              <div className=" text-left mx-auto">
                <p>
                  <span className="bg-black bg-opacity-20 rounded-md px-2 text-submain font-extrabold ">
                    Genre
                  </span>{" "}
                  : {info.genres + " "}
                </p>
                <p>
                  <span className=" bg-black bg-opacity-20 rounded-md px-2 text-submain  font-extrabold ">
                    Episodes
                  </span>{" "}
                  : {info.episodes.length}
                </p>
                <p>
                  <span className=" bg-black bg-opacity-20 rounded-md px-2 text-submain  font-extrabold ">
                    Ratings
                  </span>{" "}
                  : {info.rating / 10}
                </p>
              </div>
            </div>
            <div className=" w-full h-full flex items-center text-center justify-center z-40">
              <button
                className=" bg-black bg-opacity-40 backdrop-blur-2xl rounded-full w-1/2 lg:h-1/6 md:h-[100px] flex justify-center items-center p-2 px-5 mx-auto max-sm:text-xs lg:text-3xl md:text-xl  hover:border-2 transition-all duration-100 border-submain"
                onClick={() => {
                  callPlayer(info.episodes);
                  // console.log(
                  //   info.episodes +
                  //     ' ........................................................'
                  // );
                }}
              >
                <img
                  src={require("../assets/play.png")}
                  alt="play icon"
                  className=" max-lg:w-8 w-16"
                />
                <span className=" text-submain mx-2">Start </span> Watching
              </button>
            </div>
          </>
        ) : (
          <HashLoader color="#00ffa3" size={100} />
        )}

        {/* <HashLoader color="#36d7b7" size={100} /> */}
      </div>
    </>
  );
}
export default Description;
