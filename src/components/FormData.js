import React, { Component } from 'react';
import Input from './Input';

import './FormData.css'

class FormData extends Component {
  constructor(props){
    super(props);

    this.state = {
      live: new Array(this.props.questionInputs.length).fill(''),
      saved: {
        live: [],
      },
    }
    
    this.inputs = this.props.questionInputs;
    this.inputOnChange = this.inputOnChange.bind(this);
    this.onSubmitPersonal = this.onSubmitPersonal.bind(this);
    this.cleanInputs = this.cleanInputs.bind(this);
    this.blockInputs = this.blockInputs.bind(this);
    this.onEditForm = this.onEditForm.bind(this);
    this.addInputsOnForm = this.addInputsOnForm.bind(this);
  }

  addInputsOnForm(){
    const inToRender = this.inputs.map((input, index) => {
      return <Input 
          type={input[0]}
          id={`add${index}`}
          placeholder={input[1]} 
          handleChange={this.inputOnChange}
          setValue={this.cleanInputs}
          autoComplete='off'
          key={input[2]}/>;
    });
    return inToRender;
    
  }

  inputOnChange(input){
    this.setState(() => {
      let newArr = this.state.live;
      this.inputs.forEach((elem, i) => {
        (input.id === `add${i}`) ? newArr[i] = input.value : newArr = this.state.live;
      })
      this.props.renewAppData(newArr, input);
      return {live: newArr}
    })
    
  }

  cleanInputs(form){
    const inputs = form.querySelectorAll('input');
    inputs.forEach((elem, i) => {
      elem.value = ''
    });
  }

  blockInputs(form){
    const inputs = form.querySelectorAll('input');
    const subButton = form.querySelector('.submit-button');
    inputs.forEach((input) => {
      input.disabled = true;
    })
    subButton.disabled = true;
  }

  onSubmitPersonal(event){
    this.setState(() => {
      return {
        saved: {
          live: this.state.live,
        }
      }
    });
    this.setState(() => {
      return {
        live: [],
      }
    });
    this.cleanInputs(event.target);
    this.blockInputs(event.target);
    event.preventDefault();
  }

  onEditForm(event){
    const inputs = event.target.form.querySelectorAll('input')
    const subButton = event.target.form.querySelector('.submit-button');
    const newLive = this.state.saved.live;
    inputs.forEach((input, index) => {
      input.disabled = false;
      input.value = this.state.saved.live[index] || '';
    })
    subButton.disabled = false;
    this.setState({
      live: newLive,
    })
  }

  render(){
    return (
      <div className={this.props.className}>
        <h2>{this.props.title}</h2>
        <form onSubmit={this.onSubmitPersonal}>
          {this.addInputsOnForm()}

          <button 
          type='submit' 
          className='submit-button'>Submit</button>
          <button 
          type='button' 
          className='edit-button' 
          onClick={this.onEditForm}>Edit</button>
        </form>
      </div>
    )
  }
}

export default FormData;