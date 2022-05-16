import React, { useState, useEffect} from 'react';
import './style/App.css';
import FormOut from './components/FormOut';
import FormData from './components/FormData';
import uniqid from 'uniqid';

const App = () => {
  const [live, setLive] = useState(generateDefaultLive());

  const HandleDataFromForm = (data, event) => {
    const inputName = event.form.parentNode.className;
    let newLive = [...live];
    formInfo.forEach((form, i) => {
      if (inputName === form.formName) newLive[i] = data; 
    });
    setLive(newLive);
  };


  return <div className='app-wrapper'>
      <div className='enter-part'>
        <FormData 
          className={formInfo[0].formName} 
          title={formInfo[0].title} 
          renewAppData={HandleDataFromForm} 
          questionInputs={formInfo[0].inputs}
        />
        <FormData 
          className={formInfo[1].formName} 
          title={formInfo[1].title} 
          renewAppData={HandleDataFromForm} 
          questionInputs={formInfo[1].inputs}
        />
        <FormData 
          className={formInfo[2].formName} 
          title={formInfo[2].title} 
          renewAppData={HandleDataFromForm} 
          questionInputs={formInfo[2].inputs}
        />
      </div>
      <div className='result-part'>
        <FormOut 
        baseStructure={formInfo[0]}
        allInfo={live[0]}
        />
        <FormOut 
        baseStructure={formInfo[1]}
        allInfo={live[1]}
        />
        <FormOut 
        baseStructure={formInfo[2]}
        allInfo={live[2]}
        />
      </div>
    </div>
};

const formInfo = [
  {
    title: 'Personal Info',
    formName: 'personal-info',
    outName: 'personal-out',
    inputs: [
      ['text', 'First name', uniqid()],
      ['text', 'Second name', uniqid()],
      ['email', 'Email', uniqid()],
      ['tel', 'Phone number', uniqid()]
    ],
    output: [
      ['Name: ', [0,1,' '], uniqid()],
      ['Email: ', [2], uniqid()],
      ['Phone number: ', [3], uniqid()],
    ]
  },
  {
    title: 'Educational experience',
    formName: 'education-info',
    outName: 'education-out',
    inputs: [
      ['text', 'School name', uniqid()],
      ['text', 'Title of study', uniqid()],
      ['date', 'From', uniqid()],
      ['date', 'To', uniqid()]
    ],
    output: [
      ['School:', [0], uniqid()],
      ['Title:', [1], uniqid()],
      ['Date: ', [2,3, " - "], uniqid()],
    ]
  },
  {
    title: 'Practical experience',
    formName: 'practical-info',
    outName: 'practical-out',
    inputs: [
      ['text', 'Company name', uniqid()],
      ['text', 'Position', uniqid()],
      ['text', 'Main task', uniqid()],
      ['date', 'From', uniqid()],
      ['date', 'To', uniqid()]
    ],
    output: [
      ['Company name:', [0] , uniqid()],
      ['Position:', [1] , uniqid()],
      ['Main task:', [2] , uniqid()],
      ['Date:', [3,4, " - "] , uniqid()],
    ],
  }
];

const generateDefaultLive = () => {
    return formInfo.map((form) => {
      const formArr = new Array(form.inputs.length);
      formArr.fill('');
      return formArr;
    })
  }

export default App