import React from 'react';
import { shuffle } from '../../common/utils'
import $ from 'jquery/dist/jquery';
import { addPoints } from '../../common/actions'
import { useDispatch } from "react-redux";

function StageButtons(props){

	const dispatch = useDispatch();

	const points = (_amount)=>{
		return dispatch(addPoints(_amount));
	}

	const selectOption = (_option, _setStageState, _addError, _currentGame)=>{
		const isCorrect = _currentGame.name === _option;
		_setStageState(isCorrect);
		if(isCorrect){
			points(5)
			$('#success-modal').modal()
		} else {
			points(-1)
			_addError();
		}
	}
	
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



export default StageButtons