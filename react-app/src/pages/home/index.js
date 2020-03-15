import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { setLevel } from '../../common/actions'
import LevelButtons from '../../shared/level-buttons'
import { useDispatch } from "react-redux";

//Styles and assets
import './home.scss'

function Home(){

  const [wordsLevels, setWordsLevels] = useState(0);
  const [syllablesLevels, setSyllablesLevels] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
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
  }, []);

  const goToLevel = (_number, _route)=>{
    console.log('Going to level ', _number);
    dispatch(setLevel(_number-1));
    history.push('/'+_route)
  };

    dispatch(setLevel(-1));

    return (
    <div className="home-container">
      <h1>El juego de las palabras</h1>
      <br/>
      <div className="game-container">
        <h2>Juego de imágenes con palabras</h2>
        <LevelButtons levels={wordsLevels} goToLevel={goToLevel} component="imageWords" />
      </div>
      <div className="game-container">
        <h2>Juego de imágenes con sílabas</h2>
        <LevelButtons levels={syllablesLevels} goToLevel={goToLevel} component="imageSyllables" />
      </div>
    </div>
  )
}

export default Home;
