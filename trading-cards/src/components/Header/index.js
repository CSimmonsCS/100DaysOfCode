import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card.png';
import { Link } from "react-router-dom";


function Header() {
  return(
    <div className="Header">
      <header>
        <nav>
          <div className="logo">
            <a href="/">
              <img src={Card} alt="logo"/>
            </a>
          </div>
          <ul>
            <li>
              <Link to="/">Pokemon</Link>
            </li>
            <li>
              <Link to="/yugioh">YuGiOh</Link>
            </li>
            <li>
              <a href="#">Sign In</a>
            </li>
            <li>
              <a href="#">Sign Up</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
