import React, { Component, useState } from 'react';
import Input from './Input';

import './FormData.css';

const FormData = (props) => {
  const [live, setLive] = useState(new Array(props.questionInputs.length).fill(''));
  const [saved, setSaved] = useState([]);

  const inputOnChange = (input) => {
      let newArr = live;
      props.questionInputs.forEach((elem, i) => {
        (input.id === `add${i}`) ? newArr[i] = input.value : newArr = live;
      })
      props.renewAppData(newArr, input);
      setLive(newArr)
  }

  const addInputsOnForm = (inputs) => {
    const inToRender = inputs.map((input, index) => {
      return <Input 
          type={input[0]}
          id={`add${index}`}
          placeholder={input[1]} 
          handleChange={inputOnChange}
          setValue={cleanInputs}
          autoComplete='off'
          key={input[2]}/>;
    });
    return inToRender;
  }

  const cleanInputs = (form) => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach((elem) => {
      elem.value = ''
    });
  }

  const blockInputs = (form) => {
    const inputs = form.querySelectorAll('input');
    const subButton = form.querySelector('.submit-button');
    inputs.forEach((input) => {
      input.disabled = true;
    })
    subButton.disabled = true;
  }

  const onSubmitPersonal = (event) => {
    setSaved(live)
    setLive([])
    cleanInputs(event.target);
    blockInputs(event.target);
    event.preventDefault();
  }

  const onEditForm = (event) => {
    const inputs = event.target.form.querySelectorAll('input')
    const subButton = event.target.form.querySelector('.submit-button');
    const newLive = saved;
    inputs.forEach((input, index) => {
      input.disabled = false;
      input.value = saved[index] || '';
    })
    subButton.disabled = false;
    setLive(newLive);
  }
  
  return <div className={props.className}>
      <h2>{props.title}</h2>
      <form onSubmit={onSubmitPersonal}>
        {addInputsOnForm(props.questionInputs)}

        <button 
        type='submit' 
        className='submit-button'>Submit</button>
        <button 
        type='button' 
        className='edit-button' 
        onClick={onEditForm}>Edit</button>
      </form>
    </div>;
}

export default FormData;