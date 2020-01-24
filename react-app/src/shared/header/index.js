import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
import './header.scss'

function Header(){
  const counter = useSelector(state => state);
  const points = counter.points;
  const level = counter.level;
  console.log({counter})
  return(
    <nav className="header">
      <Link to="/">
        <button className="btn">Home</button>
      </Link>
      <span className="points-container">Nivel {level}</span>
      <span className="points-container">{points} Puntos</span>
    </nav>
  )
}

export default Header;