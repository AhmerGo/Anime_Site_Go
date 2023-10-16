import React from "react";
import { SwiperSlide } from "swiper/react";
import { AnimeApi } from "../backend/Animeapi.ts";
import { useState, useEffect } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import useWindowResize from "../backend/useWindowResize.ts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Topmovies() {
  const [topmovies, setTopmovies] = useState([]);

  const gettopmovies = async () => {
    try {
      const data = await AnimeApi.advancedSearch({ format: "MOVIE" });
      setTopmovies(data.results);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (topmovies.length === 0) {
      gettopmovies();
    }
  }, [topmovies.length]);

  const navigate = useNavigate();
  function callDescription(id) {
    navigate("/description", { state: { id: id } });
  }

  const { windowDimension } = useWindowResize();
  const { winWidth } = windowDimension;

  const slideHeight = () => {
    if (winWidth <= 500) {
      return 10;
    }
    if (winWidth > 500 && winWidth <= 800) {
      return 15;
    }
    if (winWidth > 800 && winWidth <= 1100) {
      return 15;
    }
    if (winWidth > 1100 && winWidth <= 1440) {
      return 22;
    }
    if (winWidth > 1440) {
      return 27;
    }
  };

  return (
    <>
      <div id="explore" className=" left-0  mt-32 md:-mx-14 lg:-mx-36  ">
        <AnimationOnScroll
          animateIn="animate__lightSpeedInRight"
          duration={0.9}
        >
          <div className=" pb-10 w-auto flex justify-center font-monoton max-sm:text-xl md:text-3xl text-submain">
            Top Movies
          </div>
        </AnimationOnScroll>
        <div
          className={`2xl:mx-10 xl:mx-12 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-4 grid-cols-2 grid-rows-4 max-sm:gap-6 md:gap-10 lg:gap-16`}
        >
          {topmovies.map((anime) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: "spring" }}
            >
              <SwiperSlide
                className=" group  rounded-xl overflow-hidden hover:shadow-xl"
                style={{
                  height: `${slideHeight()}em`,
                  transitionDuration: "0.7s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                <img
                  src={anime.image}
                  loading="lazy"
                  alt={anime.title.english}
                  className=" w-full h-full object-cover group-hover:animate-pulse"
                />

                <div className=" absolute w-full pt-4 rounded-xl bg-black bg-opacity-30 backdrop-blur-md flex justify-center text-center text-white font-extrabold  max-sm:font-semibold max-sm:text-base  md:text-lg lg:text-xl top-auto bottom-0 right-0 left-0 md:pb-5 group-hover:hidden">
                  {anime.title.romaji}
                </div>

                <div className=" ease-in-out absolute top-auto left-0 bottom-0 right-0 hidden group-hover:grid mb-4 max-sm:gap-2 md:gap-5 ">
                  <div className=" hidden lg:grid gap-4 ">
                    {anime.genres.slice(0, 3).map((genre) => (
                      <p className=" bg-black bg-opacity-40 backdrop-blur-lg rounded-full w-auto text-center p-2 px-5 mx-auto flex max-sm:text-xs transition-all duration-300 ease-in-out">
                        {genre}
                      </p>
                    ))}
                  </div>

                  <button className=" hover:px-10 bg-black bg-opacity-40 backdrop-blur-lg rounded-full w-auto text-center p-2 px-5 mx-auto flex max-sm:text-xs transition-all duration-300 ease-in-out">
                    <img
                      src={require("../assets/calender.png")}
                      alt="episode logo"
                      className=" w-7 h-7 max-sm:w-5 max-sm:h-5"
                    />
                    {anime.releaseDate}
                  </button>
                  <button className=" hover:px-4 bg-black bg-opacity-40 backdrop-blur-lg rounded-full w-auto text-center p-2 px-5 mx-auto flex justify-center items-center max-sm:text-xs transition-all duration-300 ease-in-out">
                    <img
                      src={require("../assets/star.png")}
                      alt="episode logo"
                      className=" w-7 h-7 max-sm:w-5 max-sm:h-5"
                    />
                    Ratings : {anime.rating}
                  </button>

                  <button
                    className=" hover:px-10 bg-black bg-opacity-40 backdrop-blur-lg rounded-full w-auto flex justify-center items-center p-2 px-5 mx-auto max-sm:text-xs transition-all duration-300 ease-in-out "
                    onClick={() => callDescription(anime.id)}
                  >
                    <img
                      src={require("../assets/play.png")}
                      alt="play icon"
                      className=" max-lg:w-8 w-16"
                    />
                    Watch Now
                  </button>
                </div>
              </SwiperSlide>
            </motion.div>
          ))}
        </div>

        <p className=" bg-rare3 h-[1.3px] rounded-xl mt-16 max-sm:mx-10 md:mx-28 lg:mx-40 ">
          <p></p>
        </p>
      </div>
    </>
  );
}

export default Topmovies;
