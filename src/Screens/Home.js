import React from 'react';
import Banner from '../components/Banner';
import Panime from '../components/Panime';
import Rrelease from '../components/Rrelease';
import Topmovies from '../components/Topmovies';
import Topshows from '../components/Topshows';
import Layout from '../Layout/Layout';
import Footer from '../Layout/Footer/Footer';
// import { AnimationOnScroll } from 'react-animation-on-scroll';
// import Navbar from '../Layout/Navbar/Navbar';

// Handles logo click
//  const handleLogoClick = () => {
//   navigate("/home");
//   //  Smooth scroll to top of page
//   window.scrollTo({ top: 0, behavior: "smooth" });
//   dispatch(setSearchQuery(""));
// };

function Home() {
  return (
    <>
      <Layout>
        <div
          id="home"
          className=" container top-0 left-0 right-0 min-h-screen px-2 mb-6 mt-10"
        >
          {/* <Navbar /> */}
          <Banner />
          <Panime />
          <Rrelease />
          <Topmovies />
          <Topshows />
        </div>
      </Layout>
      <Footer />
    </>
  );
}

export default Home;

// {
//   /* <a
//           href="https://www.instagram.com/cyber_gaz/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           hello {HiArrowNarrowDown}
//         </a> */
// }
