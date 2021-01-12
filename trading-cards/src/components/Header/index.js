import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card.png';


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
              <a href="#">Pokemon</a>
            </li>
            <li>
              <a href="#">YuGiOh</a>
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
