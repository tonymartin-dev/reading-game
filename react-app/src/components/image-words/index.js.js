import React, { useState } from 'react';
//Components
import StageButtons from '../stage-buttons';
import SuccessModal from '../success-modal';
//Styles and assets
import './image-words.scss'
import images from '../../assets/img/images';
//Utils
import { getRandomInt, removeAccents } from '../utils';

function ImageWords(){
	
	const [level, setLevel] = useState(0);
	const [stage, setStage] = useState(0);
	const [stageCompleted, setStageState] = useState(false);
	const [errors, setErrors] = useState(0);
	const [currentGame, setCurrentGame] = useState(null);
	const [isLastStage, setLastStage] = useState(false);
	const [isLastLevel, setLastLevel] = useState(false);

	const buttonsPerPage = 4;

	const goToNextStage = ()=>{
		const nextStage = stage+1;
		setErrors(0)
		setStageState(false);
		if(isLastStage){
			setStage(0);
			goToNextLevel();
		}else{
			setStage(nextStage);
		}
	}

	const goToNextLevel = ()=>{
		const nextLevel = level+1;
		setErrors(0);
		if(!isLastLevel){
			setLevel(nextLevel);
		}
	}

	const getCurrentGame = (_level, _stage, _gameData)=>{
		const name = _gameData.levels[_level].stages[stage];
		const img = images[removeAccents(name)];
		const allOptions = _gameData.levels[_level].options;
		setLastStage(stage+1 === _gameData.levels[_level].stages.length);
		setLastLevel(level+1 === _gameData.levels.length)
		let options = new Set();
		options.add(name);
		while(options.size < buttonsPerPage){
			const randomIndex = getRandomInt(0, allOptions.length-1);
			if(isNaN(randomIndex)) break;
			const randomOption = allOptions[randomIndex];
			options.add(randomOption);
		}
		return{name, img, options}
	}

	function getGamesData(){
		fetch('./db/imageWords.json').then(res=>
			res.json().then(data=>{
				console.log({data});
				const game = getCurrentGame(level, stage, data);
				if(!currentGame || game.name !== currentGame.name)
					setCurrentGame(game);
				console.log('ready', {currentGame})
			})
		)
	}

	function addError(){
		setErrors(errors+1);
	}

	getGamesData()

	return (
		currentGame ? 
		<div className="container">
			<div className="img-container">
				<img className="main-img" src={currentGame.img} alt=""></img>
			</div>
			{(
				stageCompleted ? 
					(
						<div>
							<div className="button-container">
								<button className="btn btn-outline-primary">{currentGame.name}</button>
							</div>
						</div>
					):
					(
						<div>
							<div className="button-container">
								<StageButtons stage={stage} currentGame={currentGame} setStageState={setStageState} addError={addError} />
							</div>
							{(
								errors ? 
								<div className="footer">
									<button className="btn btn-danger">Inténtalo de nuevo</button>
								</div>
								:null
							)}
						</div>
					)
      )}
      
      <SuccessModal stage={stage} isLastStage={isLastStage} goToNextStage={goToNextStage} ></SuccessModal>

		</div>
		:null			
	);
}

export default ImageWords