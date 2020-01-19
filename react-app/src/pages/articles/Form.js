import React, { useState } from "react";
import {addArticle} from '../../common/actions'

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Form() {

	const [title, setTitle] = useState('título');

  const counter = useSelector(state => state);
  const dispatch = useDispatch();

  const handleChange = (event)=>{
    setTitle(event.target.value);
  }

  const addCar = ()=>{
    console.log(counter)
    return dispatch(addArticle("CAR"));
  }

  const save = ()=>{
    console.log(counter);
    return dispatch(addArticle(title));
  }

  return (
    <>
      <input type="text" id="title" value={title} onChange={handleChange}/>
      <button onClick={() => save()}>
        Save
      </button>
      <button onClick={() => addCar()}>
        Car2
      </button>
    </>
  )

}

export default Form;
