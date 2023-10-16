import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  Autoplay,
  EffectCoverflow,
} from "swiper";
import { AnimeApi } from "../backend/Animeapi.ts";
import { useState, useEffect } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import useWindowResize from "../backend/useWindowResize.ts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Rrelease() {
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecent = async () => {
      try {
        const { data } = await AnimeApi.getRecentEpisodes();
        console.log(data); // to check the structure of the data
        setRecent(data.results); // 'results' contains the array of recent episodes
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    if (recent.length === 0) {
      getRecent();
    }
  }, [recent]);

  const handleAnimeClick = (anime) => {
    navigate("/description", { state: { id: anime.id } });
  };

  const { windowDimension } = useWindowResize();
  const { winWidth } = windowDimension;

  const itemCount = () => {
    if (winWidth <= 500) {
      return 3;
    }
    if (winWidth > 500 && winWidth <= 800) {
      return 3;
    }
    if (winWidth > 800 && winWidth <= 1440) {
      return 3;
    }
    if (winWidth > 1440 && winWidth <= 1790) {
      return 4;
    }
    if (winWidth > 1790) {
      return 5;
    }
  };

  const spaceBetween = () => {
    if (winWidth <= 500) {
      return 10;
    }
    if (winWidth > 500 && winWidth <= 800) {
      return 15;
    }
    if (winWidth > 800 && winWidth <= 1100) {
      return 18;
    }
    if (winWidth > 1100 && winWidth <= 1440) {
      return 20;
    }
    if (winWidth > 1440) {
      return 30;
    }
  };

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
      return 22;
    }
  };

  return (
    <>
      <div className="left-0 mt-20 md:-mx-24 lg:-mx-48">
        <AnimationOnScroll animateIn="animate__swing" duration={2}>
          <div className="pb-10 flex justify-center font-monoton max-sm:text-xl md:text-3xl text-submain">
            Recent Releases
          </div>
        </AnimationOnScroll>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, type: "spring" }}
        >
          <Swiper
            modules={[
              Pagination,
              Scrollbar,
              Mousewheel,
              Autoplay,
              A11y,
              EffectCoverflow,
            ]}
            spaceBetween={spaceBetween()}
            slidesPerView={itemCount()}
            loop={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            effect="coverflow"
            className="w-full xl:h-96 bg-transparent lg:h-64 h-30"
          >
            {recent &&
              recent.map((anime) => (
                <SwiperSlide
                  key={anime.episodeId}
                  className="relative group rounded-xl overflow-hidden hover:shadow-xl"
                  style={{
                    height: `${slideHeight()}em`,
                    transitionDuration: "0.7s",
                    transitionTimingFunction: "ease-in-out",
                  }}
                  onClick={() => handleAnimeClick(anime)}
                >
                  <img
                    src={anime.image}
                    alt={`${anime.title} Episode ${anime.episodeNumber}`}
                    className="w-full h-full object-cover group-hover:animate-pulse"
                  />
                  <div className="absolute w-full pt-8 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center text-center text-white font-extrabold max-sm:font-semibold max-sm:text-base md:text-lg lg:text-2xl top-0 bottom-0 right-0 left-0 group-hover:hidden">
                    {anime.title} - Episode {anime.episodeNumber}
                  </div>
                  <div className="absolute md:top-36 lg:top-60 max-sm:top-16 left-0 bottom-0 right-0 hidden group-hover:block transition-all duration-500 ease-in-out">
                    <button
                      className="hover:px-10 transition-all duration-300 bg-black bg-opacity-40 backdrop-blur-lg rounded-full w-auto flex justify-center items-center p-2 px-5 mx-auto max-sm:text-xs"
                      onClick={() => handleAnimeClick(anime)}
                    >
                      <img
                        src={require("../assets/play.png")}
                        alt="play icon"
                        className="max-lg:w-8 w-16"
                      />
                      Watch Episode {anime.episodeNumber}
                    </button>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </motion.div>
        <p className="bg-rare3 h-[1.3px] rounded-xl mt-16 max-sm:mx-10 md:mx-28 lg:mx-40">
          <p></p>
        </p>
      </div>
    </>
  );
}

export default Rrelease;
