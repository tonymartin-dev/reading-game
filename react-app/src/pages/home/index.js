import React from 'react';
import {Link} from "react-router-dom";

//Styles and assets
import './home.scss'

function Home(){

  return (
    <nav>
      <ul className="main-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/imageWords">ImageWords</Link></li>
        <ul className="sublist">
          <li>Stage 1</li>
        </ul>
      </ul>
    </nav>
  )
}

export default Home;
