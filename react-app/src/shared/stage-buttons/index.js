import React from 'react';
import { shuffle } from '../../common/utils'
function StageButtons(props){

	const selectOption = (_option)=>{
		props.onOptionClick(_option);
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
				onClick={()=>selectOption(option)}
			>
				{option}
			</button>
		)
	})
}



export default StageButtons