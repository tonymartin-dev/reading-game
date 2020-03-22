import React from 'react';

import './numbers-table.scss'

function NumbersTable(){

  const numbersArray = [];
  for( let i = 1; i <= 100;  i++){
    const isHidden = Math.floor(Math.random() * (0 - 9)) + 9;

    numbersArray.push({
      number: i,
      isShown: !isHidden,
      isCorrect: false
    })
  }
  console.log(numbersArray);

  const check = ()=>{
    // const form = document.getElementById('numbers-table');
    let isValid = true;
    numbersArray.forEach(element=>{
      const input = document.getElementById(element.number);
      const isInvalid = parseInt(input.value) !== element.number;
      if(isInvalid){
        input.classList.add('invalid');
        isValid = false;
      } else {
        element.isCorrect = true;
      }
      return isInvalid
    });
    alert(isValid ? 'OK' : 'Hay un error')
  };

  return (
    <div className="container">
      <form id="numbers-table" className="main-table">
        {(numbersArray.map(element=>
          <div key={element.number} className="cell">
            <input
              id={element.number}
              type="number"
              value={element.isShown ? element.number : undefined}
              disabled={element.isShown}
            />
          </div>
        ))}
      </form>
      <div className="btn-container">
        <button className="btn btn-outline-primary" onClick={()=>check()}>Comprobar</button>
      </div>
    </div>
  )
}

export default NumbersTable