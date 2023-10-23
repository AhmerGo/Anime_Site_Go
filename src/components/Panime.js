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

function Panime() {
  const [Popular, setPopular] = useState([]);

  const getPopular = async () => {
    try {
      const data = await AnimeApi.getPopular();
      setPopular(data.results);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Popular.length === 0) {
      getPopular();
    }
  }, []);

  const navigate = useNavigate();
  function callDescription(id) {
    navigate("/description", { state: { id: id } });
  }

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
      <div className=" left-0  mt-20 md:-mx-24 lg:-mx-48 ">
        {/* <AnimationOnScroll animateIn="animate__swing" duration={2}> */}
        <div className="pb-10 flex justify-center font-monoton max-sm:text-xl md:text-3xl text-submain">
          {/* font-monoton */}
          Popular Anime
        </div>
        {/* </AnimationOnScroll> */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, type: "spring" }}
        >
          <Swiper
            direction="horizontal"
            spaceBetween={spaceBetween()}
            slidesPerView={itemCount()}
            speed={1000}
            modules={[
              Pagination,
              Scrollbar,
              Mousewheel,
              Autoplay,
              A11y,
              EffectCoverflow,
            ]}
            loop={true}
            // scrollbar={{ draggable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            // mousewheel={true}
            effect="coverflow"
            className=" w-full xl:h-96 bg-transparent lg:h-64 h-30"
          >
            {Popular.map((anime) => (
              <SwiperSlide
                className="relative group  rounded-xl overflow-hidden hover:shadow-xl"
                style={{
                  height: `${slideHeight()}em`,

                  transitionTimingFunction: "ease-in-out",
                }}
                // transitionDuration: '0.7s',
              >
                <img
                  src={anime.image}
                  loading="lazy"
                  alt={anime.title.english}
                  className="w-full h-full object-cover group-hover:animate-pulse"
                />

                <div className=" absolute w-full pt-8 bg-white bg-opacity-20 backdrop-blur-sm flex justify-center text-center text-white font-extrabold max-sm:font-semibold max-sm:text-base  md:text-lg lg:text-2xl top-0 bottom-0 right-0 left-0 group-hover:hidden">
                  {anime.title.romaji}
                </div>
                <div className=" absolute md:top-36 lg:top-60 max-sm:top-16 left-0 bottom-0 right-0 hidden group-hover:block transition-all duration-500 ease-in-out">
                  <button
                    className=" hover:px-10 transition-all duration-300 bg-white bg-opacity-40 backdrop-blur-lg rounded-full w-auto flex justify-center items-center p-2 px-5 mx-auto max-sm:text-xs"
                    onClick={() => callDescription(anime.id)}
                  >
                    <img
                      src={require("../assets/play.png")}
                      alt="play icon"
                      className=" max-lg:w-8 w-16"
                    />
                    Watch Now
                  </button>
                  <button className=" hover:px-10 transition-all duration-300 bg-white bg-opacity-40 backdrop-blur-lg rounded-full w-auto flex justify-center items-center p-2 px-5 mx-auto max-sm:text-xs">
                    Plus
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </>
  );
}

export default Panime;
