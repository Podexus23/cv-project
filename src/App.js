import React from 'react';
import './style/App.css';
import FormOut from './components/FormOut';
import FormData from './components/FormData';
import uniqid from 'uniqid';
//name, email, phone number
//educational experience (school name, title of study, date of study)
//practical experience (company name, position title, main tasks of your jobs, date from and until when you worked for that company)
class App extends React.Component{
  constructor(props){
    super(props);

    this.formInfo = [
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
    this.state = {
      live: this.formInfo.map((form) => {
        const formArr = new Array(form.inputs.length);
        formArr.fill('');
        return formArr;
      }),
      saved: this.formInfo.map((form) => {
        const formArr = new Array(form.inputs.length);
        formArr.fill('');
        return formArr;
      }),
    };

    this.handlePersonalChange = this.handlePersonalChange.bind(this);
    this.onSubmitPersonal = this.onSubmitPersonal.bind(this);
    this.personalEditData = this.personalEditData.bind(this);
    this.renewDataFromForm = this.renewDataFromForm.bind(this);
  }

  handlePersonalChange(event){
    this.setState(() => {
      return (event.target.id === "first-name") ? 
      {personal: {
        firstName: event.target.value,
        secondName: this.state.personal.secondName,
        number: this.state.personal.number,
        email: this.state.personal.email,
      }} : (event.target.id === "second-name") ? 
      {personal: {
        firstName: this.state.personal.firstName,
        secondName: event.target.value,
        number: this.state.personal.number,
        email: this.state.personal.email,
      }} : (event.target.id === "email") ? 
      {personal: {
        firstName: this.state.personal.firstName,
        secondName: this.state.personal.secondName,
        number: this.state.personal.number,
        email: event.target.value,
      }} : (event.target.id === "number") ? 
      {personal: {
        firstName: this.state.personal.firstName,
        secondName: this.state.personal.secondName,
        number: event.target.value,
        email: this.state.personal.email,
      }} : false ;
    }) 
  }

  onSubmitPersonal(event){
    const personalForm = document.querySelector('.personal-form');
    const inputs = personalForm.querySelectorAll('input');
    inputs.forEach((elem) => elem.disabled = true);
    personalForm.querySelector('button').disabled = true;

    this.setState({
      saved: {
        personal: {
          firstName: this.state.personal.firstName,
          secondName: this.state.personal.secondName,
          number: this.state.personal.number,
          email: this.state.personal.email,
        }
    }
    });
    this.setState({
      personal: {
        firstName: '',
        secondName: '',
        number: '',
        email: '',
      }
    });
    event.preventDefault();
  }

  personalEditData(){
    const personalForm = document.querySelector('.personal-form');
    const inputs = personalForm.querySelectorAll('input');
    personalForm.querySelector('button').disabled = false;
    inputs.forEach((elem) => elem.disabled = false);
    this.setState({
      personal: {
        firstName: this.state.saved.personal.firstName,
        secondName: this.state.saved.personal.secondName,
        number: this.state.saved.personal.number,
        email: this.state.saved.personal.email,
      }
    })
  }
  renewDataFromForm(data, event){
    console.log(data)
    this.setState(() => {
      const inputName = event.form.parentNode.className;
      let newLive = [...this.state.live]
      this.formInfo.forEach((form, i) => {
        if (inputName === form.formName) newLive[i] = data; 
      })
      return {live: newLive};
    })
  }

  render(){
    return (
      <div className='app-wrapper'>
        <div className='enter-part'>
          <FormData className={this.formInfo[0].formName} title={this.formInfo[0].title} renewAppData={this.renewDataFromForm} questionInputs={this.formInfo[0].inputs}/>
          <FormData className={this.formInfo[1].formName} title={this.formInfo[1].title} renewAppData={this.renewDataFromForm} questionInputs={this.formInfo[1].inputs}/>
          <FormData className={this.formInfo[2].formName} title={this.formInfo[2].title} renewAppData={this.renewDataFromForm} questionInputs={this.formInfo[2].inputs}/>
        </div>
        <div className='result-part'>
          <FormOut 
          baseStructure={this.formInfo[0]}
          allInfo={this.state.live[0]}
          />
          <FormOut 
          baseStructure={this.formInfo[1]}
          allInfo={this.state.live[1]}
          />
          <FormOut 
          baseStructure={this.formInfo[2]}
          allInfo={this.state.live[2]}
          />
        </div>
      </div>
    )
  }
}

export default App