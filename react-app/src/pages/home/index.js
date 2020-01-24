import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import { setLevel } from '../../common/actions'
import { useDispatch } from "react-redux";

//Styles and assets
import './home.scss'

function LevelButtons(props){
  console.log({props});
  let numbers = [];
  for (let i = 0; i < props.levels; i++) {
    numbers.push(i+1)
  }
  console.log({numbers})
  return numbers.map((number, i)=>{
    console.log({number, i})
    return (
      <button key={number} onClick={()=>{props.goToLevel(number)}}>Nivel {number}</button>
    )
  })
}

function Home(){

  const [levels, setLevels] = useState(0);
  const history = useHistory();

  const dispatch = useDispatch();

  const goToLevel = (_number)=>{
    console.log('Going to level ', _number)
    dispatch(setLevel(_number));
    history.push('/imageWords')
  }

  fetch('../db/imageWords.json').then(res=>
    res.json().then(data=>{
      console.log({data});
      setLevels(data.levels.length);
    })
  );

  return (
    <div>
      <nav>
        <ul className="main-menu">
          <li><Link to="/imageWords">ImageWords</Link></li>
          <li><Link to="/articles">Articles</Link></li>
        </ul>
      </nav>
      <div>
        <p>Juego de imágenes con palabras</p>
        <LevelButtons levels={levels} goToLevel={goToLevel} />
      </div>
      
    </div>
  )
}

export default Home;
