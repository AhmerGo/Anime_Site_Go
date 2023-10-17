import React from "react";
import { HiArrowNarrowUp } from "react-icons/hi";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { NavHashLink } from "react-router-hash-link";
import { motion } from "framer-motion";

function Footer() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: -500 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.8 }}
        className=" bottom-0  w-full"
      >
        <div className=" py-10 flex items-center justify-center space-x-8 sm:py-5">
          <NavHashLink smooth to="/home#home">
            <AnimationOnScroll animateIn="animate__shakeY" duration={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                class="transition-all h-20 w-16 hover:h-24 max-sm:w-28 max-sm:h-28 bg-white bg-opacity-50 rounded-full flex justify-center items-center text-black hover:text-white duration-500 "
              >
                <HiArrowNarrowUp className=" text-3xl" />
              </motion.div>
            </AnimationOnScroll>
          </NavHashLink>
        </div>
        <div className=" pb-4 ">
          <div className="bg-black  rounded-xl bg-opacity-50 max-sm:mx-1 md:mx-5 lg:mx-28 h-16 px-5 flex items-center justify-between max-sm:grid max-sm:grid-cols-2 font-thin max-sm:mb-10 ">
            <a
              href="https://github.com/AhmerGo"
              target="_blank"
              rel="noreferrer"
              className="text-white text-xl font-light duration-200 hover:border-b-[3.5px] hover:pb-1 border-submain "
            >
              GITHUB
            </a>
            <a
              href="https://www.linkedin.com/in/ahmer-gondal-0a360210b//"
              target="_blank"
              rel="noreferrer"
              className="text-white text-xl font-light duration-200 hover:border-b-[3.5px] hover:pb-1 border-submain "
            >
              LINKEDIN
            </a>
            <a
              href="https://www.instagram.com/ahmergondal"
              target="_blank"
              rel="noreferrer"
              className="text-white text-xl font-light duration-200 hover:border-b-[3.5px] hover:pb-1 border-submain "
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.yahoo.com"
              target="_blank"
              rel="noreferrer"
              className="text-white text-lg font-extralight duration-200 hover:border-b-[3.5px] hover:pb-1 border-submain max-sm:-ml-6 max-sm:text-sm  "
            >
              gondal.ahmer@yahoo.com
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Footer;
