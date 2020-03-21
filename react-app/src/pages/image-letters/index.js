import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import images from "../../assets/img/images";
import {getRandomInt, removeAccents} from "../../common/utils";

import './image-letters.scss'
import SuccessModal from "../../shared/success-modal";
import {addPoints, setLevel} from "../../common/actions";

//Styles and assets
function ImageLetters(){

  const counter = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [level, setCurrentLevel] = useState(counter.level);
  const [stage, setStage] = useState(0);
  const [gamesData, setGamesData] = useState(null);               // Object with current game's data
  const [currentGame, setCurrentGame] = useState(null);
  const [stageCompleted, setStageState] = useState(false);
  const [isErrorShown, showError] = useState(false);              // Indicates whether error message must be shown
  const [isSuccessModalShown, showSuccessModal] = useState(false);// Indicates whether Success modal must be shown
  const [isLastStage, setLastStage] = useState(false);
  const [isLastLevel, setLastLevel] = useState(false);
  const [userLetters, setUserLetters] = useState([]);

  // let userLetters = (currentGame && currentGame.letters && !userLetters) ? currentGame.letters.map(()=>'') : [];

  useEffect(() => {
    getGamesData();
    clearInputs();
  }, []);

  const goToNextStage = ()=>{
    showError(false);
    setStageState(false);
    showSuccessModal(false);
    const nextStage = stage+1;
    if(isLastStage){
      return goToNextLevel();
    }else{
      setStage(nextStage);
    }
    console.log('Going to next stage...', nextStage);
    getCurrentGame(level, nextStage, gamesData);
  };

  const goToNextLevel = ()=>{
    const nextLevel = level+1;
    showError(false);
    if(nextLevel < gamesData.levels.length){
      setCurrentLevel(nextLevel);
      dispatch(setLevel(nextLevel));
      setStage(0);
    }else{
      alert('END');
      return history.push('/')
    }
    console.log('Going to next level...', nextLevel);
    getCurrentGame(nextLevel, 0, gamesData);
  };

  const getCurrentGame = (_level, _stage, _gameData)=>{
    clearInputs();
    const name = _gameData.levels[_level].stages[_stage];
    const letters = name.split('');
    // userLetters = letters.map(()=>'');
    setUserLetters(letters.map(()=>''));
    const img = images[removeAccents(name)];
    console.log({userLetters});
    // Check if we are in the las stage and/or level
    setLastStage(_stage+1 === _gameData.levels[_level].stages.length);
    setLastLevel(_level+1 === _gameData.levels.length);
    // Set current name and img in the store
    if(!currentGame || name !== currentGame.name){
      setCurrentGame({name, img, letters});
    }
    console.log('ready', {currentGame})
  };

  const getGamesData = () => {
    fetch('./db/imageWords.json').then(res=>
      res.json().then(gamesDataResponse=>{
        console.log('[getGamesData]',gamesDataResponse);
        setGamesData(gamesDataResponse);
        getCurrentGame(level, stage, gamesDataResponse);
      })
    )
  };

  const clearInput = (e) => {
    e.target.value = '';
    e.target.classList.remove('invalid');
  };

  const handleKeyUp = (e, i) => {
    if((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 192){
      userLetters[i] = e.target.value;
      const elementIndex = parseInt(e.target.getAttribute('data-index'));
      const nextElement = document.querySelectorAll(`[data-index="${elementIndex+1}"]`)[0];
      if(nextElement ){
        // nextElement.value = '';
        nextElement.focus();
      }
    } else {
      e.target.value = '';
    }
  };

  const validate = () => {
    let isValid = true;
    console.log('Validating: ', {letters: currentGame.letters, userLetters});
    currentGame.letters.forEach((letter, i)=>{
      const inputElement = document.querySelector(`[data-index="${i}"`);
      if(letter.toLowerCase() !== userLetters[i].toLowerCase()){
        inputElement.classList.add('invalid');
        isValid = false;
      } else {
        inputElement.classList.remove('invalid');
      }
    });
    console.log('Validation: ', isValid);
    showSuccessModal(isValid);
    showError(!isValid);
    dispatch(addPoints(isValid ? 5 : -1));
  };

  const clearInputs = () => {
    const inputs = document.querySelectorAll('.input-container input[type="text');
    inputs.forEach((input, i) => {
      input.value = '';
      if (i === 0){
        input.focus();
      }
    });
  };

  return (
    currentGame ?
      <div className="container">
        <div className="img-container">
          <img className="main-img" src={currentGame.img} alt=""/>
        </div>

        {( /* Options */
          stageCompleted ?
            (
              <div>
                <div className="button-container">
                  <button className="btn btn-outline-primary">{currentGame.name}</button>
                </div>
              </div>
            ):
            (
              <div className="input-container">
                <label htmlFor="main-input-1">Respuesta</label>
                <div className="input-container">
                  {( currentGame.letters.map((letter, i)=>(
                      <input
                        key={i}
                        data-index={i}
                        type="text"
                        maxLength="1"
                        onClick={e=>clearInput(e)}
                        onKeyUp={e=>handleKeyUp(e,i)}
                      />
                    ))
                  )}
                </div>
                <button className="btn btn-primary" onClick={()=>validate()}>Aceptar</button>
              </div>
            )
        )}
        {(
          isErrorShown ?
            <div className="footer">
              <button className="btn btn-danger">Inténtalo de nuevo</button>
            </div>
            :null
        )}
        {(
          isSuccessModalShown ?
            <SuccessModal isLastStage={isLastStage} onNext={goToNextStage}/>
            : null
        )}
      </div>



: null
)
}

export default ImageLetters