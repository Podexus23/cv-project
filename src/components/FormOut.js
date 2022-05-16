import React from 'react';

const PersonalOut = (props) => {


  return (
    <div className={props.baseStructure.outName}>
      <h2>{props.baseStructure.title}</h2>
      {buildDefault(props)}
    </div>
  )
}

const buildDefault = (div) => {
  const outputDivs = div.baseStructure.output.map((elem) => {
    
    let text = elem[1].length > 1 ?
    div.allInfo[elem[1][0]] + elem[1][2] + div.allInfo[elem[1][1]] :
    div.allInfo[elem[1][0]];
    const elemInside = <h3>{text}</h3>;
    
    return <div key={elem[2]}>
      {elem[0]} {elemInside}
    </div>
  })
  return outputDivs;
}

export default PersonalOut;