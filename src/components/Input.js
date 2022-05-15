import React, { Component } from 'react';

class Input extends Component{

  render(){
    return (
      <label htmlFor={this.props.id}>{this.props.name}
        <input 
        type={this.props.type} 
        id={this.props.id} 
        placeholder={this.props.placeholder}
        autoComplete={this.props.autoComplete}
        onChange={e => this.props.handleChange(e.target)}
        value={this.props.text} />
      </label>
    );
  };
}

export default Input;