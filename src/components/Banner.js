import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnimeApi } from '../backend/Animeapi.ts';
import { useState, useEffect } from 'react';
import { A11y, Autoplay, Mousewheel, Pagination, EffectFade } from 'swiper';
import { HiArrowNarrowDown } from 'react-icons/hi';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { NavHashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    try {
      const data = await AnimeApi.getTrending();
      setTrending(data.results);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (trending.length === 0) {
      getTrending();
    }
  }, [trending.length]);

  const navigate = useNavigate();
  function callDescription(id) {
    navigate('/description', { state: { id: id } });
  }

  return (
    <>
      <AnimationOnScroll animateIn="animate__fadeInLeft" duration={0.8}>
        <motion.div className=" flex justify-center items-center md:-mx-20 lg:-mx-28 ">
          <Swiper
            direction="vertical"
            spaceBetween={0}
            slidesPerView={1}
            speed={1000}
            modules={[Pagination, Mousewheel, Autoplay, A11y, EffectFade]}
            loop={true}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            // mousewheel={true}
            className=" rounded-3xl w-5/6 xl:h-96 bg-white lg:h-64 h-12"
          >
            {trending.map((anime) => (
              <SwiperSlide className="relative rounded overflow-hidden">
                <img
                  src={anime.cover}
                  alt={anime.title.english}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bg-black bg-opacity-40 rounded-3xl backdrop-blur-md w-1/3 max-sm:w-1/2  md:text-xl items-center lg:text-3xl font-extrabold top-0 bottom-0 right-0 left-0 px-5 grid justify-center grid-rows-3">
                  <div className=" w-full flex justify-center ">
                    {anime.title.romaji}
                  </div>
                  <div className=" w-full flex justify-center items-center mx-auto gap-x-9 font-quicksand max-sm:grid max-sm:gap-1 max-sm:text-sm md:text-base lg:text-lg">
                    <p className="flex gap-4 ">
                      <img
                        src={require('../assets/episode.png')}
                        alt="episode logo"
                        className=" w-7 h-7 max-sm:w-5 max-sm:h-5"
                      />
                      {anime.totalEpisodes} Episodes
                    </p>
                    <p className="flex gap-4  ">
                      <img
                        src={require('../assets/calender.png')}
                        alt="episode logo"
                        className=" w-7 h-7 max-sm:w-5 max-sm:h-5"
                      />
                      {anime.releaseDate}
                    </p>
                  </div>

                  <button
                    className=" bg-black bg-opacity-40 rounded-full w-auto flex justify-center items-center p-2 px-5 mx-auto max-sm:text-xs hover:border-2 transition duration-100 ease-in-out border-submain"
                    onClick={() => callDescription(anime.id)}
                  >
                    <img
                      src={require('../assets/play.png')}
                      alt="play icon"
                      className=" max-lg:w-8 w-16"
                    />
                    Watch Now
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </AnimationOnScroll>

      <div className=" mt-6">
        <AnimationOnScroll animateIn="animate__bounceInRight" duration={0.8}>
          <div className=" transition duration-700 font-rubik text-center sm:text-xl md:text-3xl lg:text-5xl tracking-wider max-sm:pt-8 md:pt-12 lg:pt-16  mx-auto flex justify-center items-center">
            <p> Watch Anime🎬 Eat🍿 Enjoy 😉 </p>
          </div>
        </AnimationOnScroll>
        <div className="  w-full mx-auto mt-8 flex items-center justify-center space-x-8 sm:py-5">
          <NavHashLink smooth to="/home#explore">
            <AnimationOnScroll animateIn="animate__shakeY" duration={5}>
              <div className=" transition-all h-20 w-16 hover:h-24  max-sm:w-28 max-sm:h-28 bg-white bg-opacity-50 rounded-3xl flex justify-center items-center text-black hover:text-white duration-500 ">
                <HiArrowNarrowDown className=" text-3xl" />
              </div>
            </AnimationOnScroll>
          </NavHashLink>
        </div>
      </div>
    </>
  );
}

export default Banner;
