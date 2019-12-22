import React from 'react';
import { shuffle } from '../utils'
import $ from 'jquery/dist/jquery';

function StageButtons(props){
	
	console.log('StageButtons', {props})
	
	let options = props.currentGame ? [...props.currentGame.options] : [];
	
	if(!options.length) return null;
	
	options = shuffle(options);
	
	return options.map((option, i) => {
		return (
			<button 
				key={i} 
				className="btn btn-outline-primary" 
				onClick={()=>selectOption(option, props.setStageState, props.addError, props.currentGame)}
			>
				{option}
			</button>
		)
	})
}

const selectOption = (_option, _setStageState, _addError, _currentGame)=>{
	const isCorrect = _currentGame.name === _option;
	_setStageState(isCorrect);
	if(isCorrect) $('#success-modal').modal()
	else _addError();
}

export default StageButtons