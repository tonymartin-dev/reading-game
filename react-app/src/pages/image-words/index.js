import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
//Components
import StageButtons from '../../shared/stage-buttons';
import SuccessModal from '../../shared/success-modal';
//Styles and assets
import './image-words.scss'
import images from '../../assets/img/images';
//Utils
import { getRandomInt, removeAccents } from '../../common/utils';
//Redux
import { addPoints, setLevel } from '../../common/actions';
import { useDispatch } from "react-redux";

function ImageWords(){

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

	const getGamesData = () => {
		fetch('./db/imageWords.json').then(res=>
			res.json().then(gamesDataResponse=>{
				console.log('[getGamesData]',gamesDataResponse);
				setGamesData(gamesDataResponse);
				getCurrentGame(level, stage, gamesDataResponse);
			})
		)
  };
  
	useEffect(getGamesData, []);

	console.log('[ImageWords] States: ',{
		level, stage, stageCompleted, isErrorShown, currentGame, isLastLevel, isLastStage
	});

	const buttonsPerPage = 4;

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
			return history.push('/')
		}
		console.log('Going to next level...', nextLevel);
		getCurrentGame(nextLevel, 0, gamesData);
	};

	const getCurrentGame = (_level, _stage, _gameData)=>{
		const name = _gameData.levels[_level].stages[_stage];
		const img = images[removeAccents(name)];
		const allOptions = _gameData.levels[_level].options;
		let options = new Set();
		options.add(name);
		while(options.size < buttonsPerPage){
			const randomIndex = getRandomInt(0, allOptions.length-1);
			if(isNaN(randomIndex)) break;
			const randomOption = allOptions[randomIndex];
			options.add(randomOption);
		}
		// Check if we are in the las stage and/or level
		setLastStage(_stage+1 === _gameData.levels[_level].stages.length);
		setLastLevel(_level+1 === _gameData.levels.length);
		// Set current name and game options in the store
		if(!currentGame || name !== currentGame.name){
			setCurrentGame({name, img, options});
		}
		console.log('ready', {currentGame})
	};

	const onOptionClick = (_option) => {
		showError(false);
		if(_option === currentGame.name){
			showSuccessModal(true);
			dispatch(addPoints(5));
		} else {
			showError(true);
			dispatch(addPoints(-1))
		}
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
						<div>
							<div className="button-container">
								<StageButtons currentGame={currentGame} onOptionClick={onOptionClick}/>
							</div>
							{(
								isErrorShown ?
								<div className="footer">
									<button className="btn btn-danger">Inténtalo de nuevo</button>
								</div>
								:null
							)}
						</div>
					)
      		)}

			{(
				isSuccessModalShown &&
          <SuccessModal
            isLastStage={isLastStage}
            isLastLevel={isLastLevel}
            onNext={goToNextStage}
          />
			)}

		</div>
		:null			
	);
}

export default ImageWords