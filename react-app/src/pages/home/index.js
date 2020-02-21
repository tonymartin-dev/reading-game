import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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
  console.log({numbers});
  return numbers.map((number, i)=>{
    console.log({number, i});
    return (
      <button key={number} onClick={()=>{props.goToLevel(number, props.component)}}>Nivel {number}</button>
    )
  })
}

function Home(){

  const [wordsLevels, setWordsLevels] = useState(0);
  const [syllablesLevels, setSyllablesLevels] = useState(0);
  const history = useHistory();

  const dispatch = useDispatch();

  const goToLevel = (_number, _route)=>{
    console.log('Going to level ', _number);
    dispatch(setLevel(_number));
    history.push('/'+_route)
  };

  fetch('../db/imageWords.json').then(res=>
    res.json().then(data=>{
      console.log({data});
        setWordsLevels(data.levels.length);
    })
  );

  fetch('../db/imageSyllables.json').then(res=>
    res.json().then(data=>{
      console.log({data});
      setSyllablesLevels(data.levels.length);
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
        <LevelButtons levels={wordsLevels} goToLevel={goToLevel} component="imageWords" />
      </div>
      <div>
        <p>Juego de imágenes con sílabas</p>
        <LevelButtons levels={syllablesLevels} goToLevel={goToLevel} component="imageSyllables" />
      </div>
      
    </div>
  )
}

export default Home;
