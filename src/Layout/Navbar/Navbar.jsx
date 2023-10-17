import React, { useState, useEffect, useRef, forwardRef } from "react";
import { NavLink } from "react-router-dom";
// import { Link, Navigate } from 'react-router-dom';
// import { useRef } from 'react';
import { getUser } from "../../utilities/users-service";
import * as userService from "../../utilities/users-service";

import { NavHashLink } from "react-router-hash-link";
// import { HashLink } from 'react-router-hash-link';
// import Watch from '../../components/Watch';
// import Desc from '../../Screens/Description';
const Navbar = forwardRef(({ user, onSignInClick, onSignOutClick }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.click();
  }, []);
  // const hover = 'hover:text-white transition duration-200 ease-in-out';
  // const Hover = ({ isActive }) => ( isActive ? 'text-white' : hover );
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const onChange = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setQuery(val);

    if (val.trim() === "") {
      // Clear the results when the query is empty
      setResults([]);
      return;
    }
    fetch(`https://api.consumet.org/anime/zoro/${e.target.value}?page=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };
  return (
    <>
      <div className="z-50 bg-black bg-opacity-0 backdrop-blur-2xl text-white top-0 sticky flex border-none lg:pl-[3em] lg:gap-32">
        {/* LOGO */}
        <div className=" col-span-1 sm:block hidden cursor-pointer">
          <img
            src={require("../../assets/logo.png")}
            alt="logo"
            className="w-full h-24 object-contain"
          />
          <NavHashLink
            smooth
            to="/home#home"
            className="flex justify-center items-center my-5 text-3xl text-black rounded-tr-full pr-5 pl-5 bg-white"
            ref={buttonRef}
          ></NavHashLink>
        </div>
        {/* navbar after logo */}
        <div className=" mx-auto py-3 px-2 lg:flex lg:gap-42 md:gap-10 flex items-center">
          {/* Menus */}
          <div className=" font-extrabold text-xl transition duration-200 justify-between lg:gap-10 md:gap-2 items-center md:flex hidden">
            <NavHashLink
              smooth
              to="/home#home"
              className=" hover:text-rare2 duration-100 hover:border-b-[2px] hover:pb-1 border-submain  "
            >
              Home
            </NavHashLink>
            <NavHashLink
              smooth
              to="/home#explore"
              className=" hover:text-rare2 duration-100 hover:border-b-[2px]  hover:pb-1 border-submain"
            >
              Explore
            </NavHashLink>
            <NavLink
              to="/mood"
              className=" hover:text-rare2 duration-100 hover:border-b-[2px] hover:pb-1 border-submain"
            >
              Mood
            </NavLink>
            <NavLink
              to="/Watch"
              className=" hover:text-rare2 ease-in-out duration-100 hover:border-b-[2px] hover:pb-1 border-submain"
            >
              Watchlist
            </NavLink>
            <NavLink to="/" className="pl-40 ">
              <img
                src={require("../../assets/user.png")}
                alt="profile"
                className="w-10 h-10 rounded-full"
              />
            </NavLink>
          </div>
          {/* Search Field */}
          <div className="col-span-3 flex flex-col items-center ">
            <form className="w-60 text-sm items-center text-gray-500 border-b-2 border-white rounded-none flex-btn gap-4 opacity-40 focus-within:opacity-100">
              {/* <button type="submit">
                <img
                  src={require('../../assets/searchicon.png')}
                  alt="Sicon"
                  className="pb-2 pr-6 w-20 h-8"
                />
              </button> */}
              <input
                type="text"
                placeholder="Search Anime"
                value={query}
                onChange={onChange}
                className=" text-xl font-light w-full bg-transparent focus:outline-none text-center focus:text-white text-white"
              />
            </form>
            {results.length > 0 && (
              <ul className="results  text-white mt-10 w-1/6 h-96 items-center justify-center text-center overflow-scroll absolute">
                {results.map((mov) => (
                  <li
                    className="mt-5 backdrop-blur-3xl rounded-2xl h-60 justify-center items-center flex-col pt-5/6"
                    onClick={() => {
                      console.log(mov);
                    }}
                    key={mov.id} // Add a unique key for each result
                  >
                    {mov.title}
                    <p className="mt-1 backdrop-blur-3xl rounded-2xl justify-center items-center flex group h-52 ml-2 mr-2">
                      <img
                        src={mov.image}
                        className="w-full h-full object-cover"
                        alt=""
                      />
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {results.length === 0 && query !== "" && (
              <div className="text-white mt-10 text-center">
                No results found.
              </div>
            )}
          </div>
          <div className=" font-extrabold text-xl transition duration-200 justify-between lg:gap-10 md:gap-2 items-center md:flex hidden">
            {user ? (
              <>
                <span className="hover:text-rare2 ease-in-out duration-100 hover:border-b-[2px] hover:pb-1 border-submain">
                  Welcome, {user.name}
                </span>
                <button
                  smooth
                  onClick={onSignOutClick}
                  className="hover:text-rare2 ease-in-out duration-100 hover:border-b-[2px] hover:pb-1 border-submain"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                smooth
                onClick={onSignInClick}
                className="hover:text-rare2 ease-in-out duration-100 hover:border-b-[2px] hover:pb-1 border-submain"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

export default Navbar;
