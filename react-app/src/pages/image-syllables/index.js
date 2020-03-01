import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
//Components
import StageButtons from '../../shared/stage-buttons';
import SuccessModal from '../../shared/success-modal';
//Styles and assets
import './image-syllables.scss';
import images from '../../assets/img/images';
//Utils
import { removeAccents } from '../../common/utils';
//Redux
import { addPoints } from '../../common/actions';
import { useDispatch } from "react-redux";

function ImageSyllables(){

  const counter = useSelector(state => state);
  const dispatch = useDispatch();

  const [level, setLevel] = useState(counter.level -1);           // Current level
  const [stage, setStage] = useState(0);                          // Current stage
  const [gamesData, setGamesData] = useState(null);               // Object with current game's data
  const [currentGame, setCurrentGame] = useState(null);           // Object with current game's data
  const [stageCompleted, setStageState] = useState(false);        // Indicates whether stage has been completed or not
  const [letters, setLetters] = useState({});                     // Indicates whether stage has been completed or not
  const [name, setName] = useState('');                           // Word to find in current game. It will be shortened each time player clicks a correct answer
  const [response, setResponse] = useState('');                   // String composed concatenating correct options clicked by player
  const [isErrorShown, showError] = useState(false);              // Indicates whether error message must be shown
  const [isSuccessModalShown, showSuccessModal] = useState(false);// Indicates whether Success modal must be shown
  const [isLastStage, setLastStage] = useState(false);            // Boolean passed to success modal to indicate if it must show end stage message or normal success message
  const [isLastLevel, setLastLevel] = useState(false);

  useEffect(() => {
    getGamesData();
  }, []);
  
  console.log('[ImageSyllables] States: ',{
    level, stage, currentGame, stageCompleted, letters, name, response,
    isErrorShown, isSuccessModalShown, isLastLevel, isLastStage
  });

  const buttonsPerPage = 6;
  
  const goToNextStage = ()=>{
    showError(false);
    setStageState(false);
    showSuccessModal(false);
    setResponse('');
    const nextStage = stage+1;
    if(isLastStage){
      goToNextLevel();
    }else{
      setStage(nextStage);
    }
    console.log('Going to next stage...', nextStage);
    getCurrentGame(level, nextStage, gamesData, letters.vowels, letters.consonants);
  };

  const goToNextLevel = ()=>{
    const nextLevel = level+1;
    if(nextLevel < gamesData.levels.length){
      setLevel(nextLevel);
      setStage(0);
    }else{
      alert('END')
    }
    console.log('Going to next level...', nextLevel)
    getCurrentGame(nextLevel, 0, gamesData, letters.vowels, letters.consonants);
  };
  
  const getSyllables = (_syllablesAmount, _vowels, _consonants, _level, forcedSyllables=[])=>{
    return new Promise(async(resolve)=>{

      let syllables = new Set(forcedSyllables);
      let letterAmount;
      const isConsonant = (_letter)=>_consonants.includes(_letter);

      switch (stage) {
        case 0:
          letterAmount = 2;
          break;        
        default:
          letterAmount = 2;
          break;
      }

      for (let a = 0; a < _syllablesAmount; a++) {
        let syllable = '';
        for (let b = 0; b < letterAmount; b++) {
          if(!isConsonant(syllable[syllable.length - 1])){
            syllable += _consonants[Math.floor(Math.random()*_consonants.length)]
          }else{
            syllable += _vowels[Math.floor(Math.random()*_vowels.length)]
          }
        }
        syllables.add(syllable);
      }

      resolve(syllables);
  

    })
  };

  const getCurrentGame = async(_level, _stage, _gamesData, _vowels, _consonants)=>{
    // Set current game data
    const name = _gamesData.levels[_level].stages[_stage].word;
    const wordSyllables = _gamesData.levels[_level].stages[_stage].syllables;
    const img = images[removeAccents(name)];
    let options = await getSyllables(
      buttonsPerPage - wordSyllables.length,
      _vowels,
      _consonants,
      _level,
      wordSyllables
    );
    // Check if we are in the las stage and/or level
	setLastStage(_stage+1 === _gamesData.levels[_level].stages.length);
    setLastLevel(_level+1 === _gamesData.levels.length);
    // Set current name and game options in the store
    if(!currentGame || name !== currentGame.name){
      setCurrentGame({name, img, options});
      setName(name);
    }
    console.log('ready', {currentGame});
  };

  const onOptionClick = (_option)=>{
    let reducedName = _option;
    if(name.startsWith(_option)){
      showError(false);
      reducedName = name.replace(_option, '');
      setName(reducedName);      
      setResponse(response.concat(_option));
    }else{
      showError(true);
      dispatch(addPoints(-1))
    }
    console.log('reducedName', reducedName.length);

    if(!reducedName.length){
      console.log('Correct!!');
      dispatch(addPoints(5));
      showSuccessModal(true)
    }
  };
  
  const getGamesData = async() => {
    //Obtain game data from service
    const [rawGamesData, rawUtils] = await Promise.all([
      fetch('./db/imageSyllables.json'),
      fetch('./db/utils.json')
    ]);
    const [gamesDataResponse, utils] = await Promise.all([
       rawGamesData.json(),
       rawUtils.json()
    ]);
    console.log('[getGamesData]', {gamesDataResponse, utils});
    const vowels = utils.vowels.split('');
    const consonants = utils.consonants.split('');
    setGamesData(gamesDataResponse);
    setLetters({vowels, consonants});
    //Pass game data to build the game structure
    await getCurrentGame(level, stage, gamesDataResponse, vowels, consonants);
  };

  return (
		currentGame ?
		<div className="container">
          <div className="img-container">
            <img className="main-img" src={currentGame.img} alt=""/>
          </div>
          {(
            stageCompleted ?
              (
                <div>
                  <div className="button-container">
                    <button className="btn btn-outline-primary">{currentGame.name}</button>
                  </div>
                </div>
              ) :
              (
                <div>
                  <div className="button-container">
                    <StageButtons currentGame={currentGame} onOptionClick={onOptionClick}/>
                  </div>
                  <h2>{response}</h2>
                  {(
                    isErrorShown ?
                      <div className="footer">
                        <button className="btn btn-danger">Inténtalo de nuevo</button>
                      </div>
                    : null
                  )}
                </div>
              )
          )}

          {(
            isSuccessModalShown ?
              <SuccessModal isLastStage={isLastStage} goToNextStage={goToNextStage}/>
            : null
          )}

		</div>
		:null
	);

}

export default ImageSyllables;