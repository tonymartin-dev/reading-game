import React, { useState } from 'react';
import { useSelector } from "react-redux";
//Styles and assets
import './image-syllables.scss';
import images from '../../assets/img/images';
//Utils
import { getRandomInt, removeAccents } from '../../common/utils';

function ImageSyllables(){

  const counter = useSelector(state => state);

  const [level, setLevel] = useState(counter.level -1);
  const [stage, setStage] = useState(0);
	const [stageCompleted, setStageState] = useState(false);
	const [errors, setErrors] = useState(0);
	const [currentGame, setCurrentGame] = useState(null);
	const [isLastStage, setLastStage] = useState(false);
  const [isLastLevel, setLastLevel] = useState(false);

  console.log('[ImageSyllables] States: ',{level, stage, stageCompleted, errors, currentGame, isLastLevel, isLastStage })

	const buttonsPerPage = 6;
  
  const getSyllables = ()=>{
    return new Promise(resolve=>{

      fetch('./db/utils.json').then(res=>
        res.json().then(data=>{
          const vowels = data.vowels.split('');
          const consonants = data.consonants.split('');
          let syllables = [];
          let letterAmount;
          const isConsonant = (_letter)=>consonants.includes(_letter);
  
          switch (stage) {
            case 0:
              letterAmount = 2;
              break;        
            default:
              break;
          }
  
          for (let a = 0; a < buttonsPerPage; a++) {
            let syllable = '';
            for (let b = 0; b < letterAmount; b++) {
              if(!isConsonant(syllable[syllable.length - 1])){
                syllable += consonants[Math.floor(Math.random()*consonants.length)]
              }else{
                syllable += vowels[Math.floor(Math.random()*vowels.length)]
              }
            }
            syllables.push(syllable);
          }
  
          resolve(syllables);
  
        })
      )

    })
  }

  const getCurrentGame = async(_level, _stage, _gameData)=>{
		const name = _gameData.levels[_level].stages[stage].word;
		const img = images[removeAccents(name)];
		const allOptions = await getSyllables();
		setLastStage(stage+1 === _gameData.levels[_level].stages.length);
		setLastLevel(level+1 === _gameData.levels.length)
		let options = new Set(_gameData.levels[_level].stages[stage].syllables);
		//options.add(name);
		while(options.size < buttonsPerPage){
			const randomIndex = getRandomInt(0, allOptions.length-1);
			if(isNaN(randomIndex)) break;
			const randomOption = allOptions[randomIndex];
			options.add(randomOption);
		}
		return{name, img, options}
  }
  
   const getGamesData = ()=>{
		fetch('./db/imageSyllables.json').then(res=>
			res.json().then(data=>{
				console.log({data});
				getCurrentGame(level, stage, data).then(game=>{
          if(!currentGame || game.name !== currentGame.name)
            setCurrentGame(game);
          console.log('ready', {currentGame})

        });
			})
		)
  }
  
  getGamesData();

  return (
		<h1>Hello</h1>	
	);

}

export default ImageSyllables;