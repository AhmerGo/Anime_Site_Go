import { useState, useRef, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import "../../components/css/AnimeCard.css";
import "../../components/css/AnimeStream.css";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import { AniApi } from "../../components/api";
import Searching from "../../components/Searching";
import RecentAnime from "../RecentAnime";
import PopularAnime from "../PopularAnime";
import AnimeDetails from "../AnimeDetails";
import AnimeStream from "../AnimeStream";
// import DiscussionPage from '../DiscussionPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [recent, setRecent] = useState([]);
  const [popular, setPopular] = useState([]);
  const [search, setSearch] = useState(null);
  const searchRef = useRef();
  const renderOnCall = useRef(false);

  async function getAnime(id = 1) {
    try {
      const Data = await axios.get(`${AniApi}/anime/gogoanime/recent-episodes`);

      //api.consumet.org/anime/gogoanime/recent-episodes
      https: setRecent((recent) => [...recent, ...Data.data.results]);
    } catch (err) {
      console.error(err);
      return { error: "Could not retrieve recent episodes" };
    }
  }

  async function getPopularAnime(id = 1) {
    try {
      const pop = await axios.get(
        `${AniApi}/meta/anilist/popular?page=${id}&perPage=20`
      );
      setPopular((popular) => [...popular, ...pop.data.results]);
    } catch (err) {
      console.err(err);
      return { error: "Could not retrieve popular episodes" };
    }
  }

  useEffect(() => {
    if (!renderOnCall.current) {
      getAnime(1);
      getPopularAnime();
    }
    renderOnCall.current = true;
  }, []);

  const handleChange = async (input) => {
    try {
      const searchInput = await axios.get(`${AniApi}/meta/anilist/${input}`);
      if (input === "") {
        setSearch(null);
      } else {
        setSearch(searchInput.data);
      }
    } catch (err) {
      console.err(err);
      return { error: "Failed to search, try again!" };
    }
  };

  const handleClick = () => {
    setSearch(null);
    searchRef.current.emptySearch();
  };

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar
            user={user}
            setUser={setUser}
            handleChange={handleChange}
            ref={searchRef}
          />
          {search ? (
            <Searching search={search} handleClick={handleClick} />
          ) : null}
          <Routes>
            <Route
              path="/"
              element={
                <RecentAnime
                  recent={recent}
                  popular={popular}
                  search={search}
                  handleClick={handleClick}
                />
              }
            />
            <Route
              path="/popular"
              element={
                <PopularAnime
                  popular={popular}
                  search={search}
                  handleClick={handleClick}
                />
              }
            />
            <Route
              path="anime-details/:animeId"
              element={<AnimeDetails handleClick={handleClick} />}
            />
            <Route
              path="/watch/:episodeId/:animeId"
              element={<AnimeStream />}
            />
            {/* <Route
              path="/discuss"
              element={
                <DiscussionPage />
              }
              /> */}

            {/* Route components in here */}
            {/* <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} /> */}
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
