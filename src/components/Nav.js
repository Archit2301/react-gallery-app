import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return(
      <nav className="main-nav">
          <ul>
              <li><NavLink to='/music'>Music</NavLink></li>
              <li><NavLink to='/sports'>Sports</NavLink></li>
              <li><NavLink to='/health'>Health</NavLink></li>
          </ul>
      </nav>
  );
}

export default Nav;