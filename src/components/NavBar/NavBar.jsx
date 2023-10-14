import { Link } from 'react-router-dom';
import { useState, useImperativeHandle, forwardRef } from 'react';
import * as userService from '../../utilities/users-service';
import './NavBar.css';


const NavBar = forwardRef(({ user, setUser, handleChange }, ref) => {
  const [inputVal, setInputVal] = useState('');

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    handleChange(val);
  }

  useImperativeHandle(ref, () => ({
    emptySearch() {
      setInputVal('');
    },
  }));

  return (
    <nav className="navbar">
      <Link to="/" id='nav-home'>
        <span className="nav-text">Home</span>
      </Link>
      <Link to="/discuss">
        <span className="nav-text">Discussion</span>
      </Link>
      <div className="search">
        <input
          type="text"
          className="navbar-search-input"
          placeholder="Search"
          value={inputVal}
          onChange={handleInputChange}
        />
      </div>
      <span className="nav-text">Welcome, {user.name}</span>
      <Link to="" onClick={handleLogOut}>
        <span className="nav-text">Log Out</span>
      </Link>
    </nav>
  );
});

export default NavBar;