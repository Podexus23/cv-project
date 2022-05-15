import React from 'react';

class PersonalOut extends React.Component {
  constructor(props){
    super(props);

    this.blockDefault = this.props.baseStructure;

    this.buildDefault = this.buildDefault.bind(this);
  }

  buildDefault(){
    console.log(this.props.allInfo)
    const outputDivs = this.blockDefault.output.map((elem) => {
      
      let text = elem[1].length > 1 ?
      this.props.allInfo[elem[1][0]] + elem[1][2] + this.props.allInfo[elem[1][1]] :
      this.props.allInfo[elem[1][0]];
      const elemInside = <h3>{text}</h3>;
      
      return <div key={elem[2]}>
        {elem[0]} {elemInside}
      </div>
    })
    return outputDivs;
  }

  render(){
    return (
      <div className={this.blockDefault.outName}>
        <h2>{this.blockDefault.title}</h2>
        {this.buildDefault()}
        {/* <div>
          {this.blockDefault.output[0][0]} <h3 className='personal-result-name'>{this.props.allInfo[0]} {this.props.allInfo[1]}</h3>
        </div>
        <div>
          Email: <h3 className='personal-result-name'>{this.props.allInfo[2]}</h3>
        </div>
        <div>
          Phone number: <h3 className='personal-result-name'>{this.props.allInfo[3]}</h3>
        </div> */}
      </div>
    )
  }
}

export default PersonalOut;