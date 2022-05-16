import React from 'react';

function Input(props){

    return <label htmlFor={props.id}>{props.name}
        <input 
        type={props.type} 
        id={props.id} 
        placeholder={props.placeholder}
        autoComplete={props.autoComplete}
        onChange={e => props.handleChange(e.target)}
        value={props.text} />
      </label>
}

export default Input;