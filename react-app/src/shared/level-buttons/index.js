import React from 'react';

function LevelButtons(props){
    console.log({props});
    let numbers = [];
    for (let i = 0; i < props.levels; i++) {
        numbers.push(i+1)
    }
    console.log({numbers});
    return numbers.map((number, i)=>{
        return (
            <button
                key={number}
                className="btn level-btn"
                onClick={()=>{props.goToLevel(number, props.component)}}
            >
                Nivel {number}
            </button>
        )
    })
}

export default LevelButtons