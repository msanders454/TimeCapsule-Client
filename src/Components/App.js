/* eslint-disable no-unused-vars */
import React from 'react';
import ApiService from '../apiServices/services'
import { Route, Switch } from 'react-router-dom'
import Header from './header/header'
import LandingPage from './landing-page/landing-page'
import LoginPage from './login/LoginPage';
import RegistrationForm from './registration/RegistrationPage';
import CapsulesPage from './capsules/capsules-page'
import CapsuleContext from './CapsuleContext';
import AddCapsulePage from './addCapsule/addCapsule'
import moment from 'moment'


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      capsules: [],
      userName: "Demo123",
      usernumber: 1,
      loaded: false,
      error: null,
    }
  }

  //Organize data to insert in table via API, make API call, and handle response.
  handleAddCapsule = (event, data) => {
    event.preventDefault()
    let buryDate = (moment())
    let unlockDate = this.getTime(data.time)
    let imageLink = !data.imagelink ? '' : data.imagelink
    let newCapsule = {
      title: data.title,
      note: data.note,
      imageurl: imageLink,
      burydate: buryDate,
      unlockdate: unlockDate,
      usernumber: this.state.usernumber
    }
    ApiService.postCapsules(newCapsule)
      .then(response => this.handleResponse(response))
      .catch(err => this.handleError())
  }

  //Based on time input, get Moment.js-readable data.
  getTime = (time) => {
    let unlock
    switch (time) {
      case 'One-minute': unlock = moment().add(1, 'minute');
        break;
      case 'Ten-minutes': unlock = moment().add(10, 'minute');
        break;
      case 'One-hour': unlock = moment().add(1, 'hour');
        break;
      case 'Two-hours': unlock = moment().add(2, 'hour');
        break;
      case 'Twelve-hours': unlock = moment().add(12, 'hour');
        break;
      case 'One-day': unlock = moment().add(1, 'day');
        break;
      case 'Two-days': unlock = moment().add(2, 'day');
        break;
      case 'Five-days': unlock = moment().add(5, 'days');
        break;
      case 'One-week': unlock = moment().add(1, 'week');
        break;
      case 'Four-weeks': unlock = moment().add(4, 'weeks');
        break;
      case 'One-month': unlock = moment().add(1, 'month');
        break;
      case 'Six-months': unlock = moment().add(6, 'months');
        break;
      case 'One-year': unlock = moment().add(1, 'year');
        break;
      case 'Two-years': unlock = moment().add(2, 'years');
        break;
      case 'Five-years': unlock = moment().add(5, 'years');
        break;
      case 'Ten-years': unlock = moment().add(10, 'years');
        break;
      default: unlock = moment().add(1, 'minute')
    }
    return unlock
  }

  updateUserInfo  = newName => {
    this.setState({ 
        userName: newName
     });
     fetch(`https://damp-refuge-24075.herokuapp.com/api/users/${this.state.userName}`, {
          method: "GET",
          headers: {
              "content-type": "application/json",
          }
      })
          .then(res => {
              if (!res.ok) {
                  throw new Error(res.status);
              }
              return res.json();
          })
          .then(this.getUserInfo)
          .catch(error => this.setState({ error }));
  };

  getUserInfo  = user => {
    this.setState({ 
      usernumber: user.id,
   });
   this.getList()
};

  //Upon receiving response from POST, put this data in this component's state so it can be accessed elsewhere.
  handleResponse = (response) => {
    let updatedCapsules = this.state.capsules.concat(response)
    this.setState({
      capsules: updatedCapsules
    })
  }

  //Upon receiving data from initial GET request, put this data in the component's state so it can be accessed elsewhere.
  handleCapsules = (newCapsules) => {
    this.setState({
      loaded: true,
      capsules: newCapsules
    })
  }

  //Handle errors with API calls, displaying an alert message.
  handleError = () => {
    alert('There was an error with your request. Please check your internet connection and try again.')
  }

  //Make a DELETE API call, thus removing the relevant capsule. Filter capsules to remove the relevant one from the state
  //(and, consequently, the DOM).
  handleDelete = (id) => {
    let newCapsules = this.state.capsules.filter(capsule => capsule.id !== id)
    this.setState({
      capsules: newCapsules
    })
    ApiService.deleteCapsules(id)
      .catch(err => this.handleError())
  }

  //Make initial API call to get all existing capsules.


  //Call getcapsules function on component mount to get capsules.
  getList() {
    fetch(`https://damp-refuge-24075.herokuapp.com/api/capsule/user/${this.state.usernumber}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        })
      .then(this.handleCapsules)
      .catch(error => this.setState({ error }));
  }

  render() {
      
    const contextValue = {
        expenses: this.state.expenses,
        userName: this.state.userName,
        usernumber: this.state.usernumber,
        updateUserInfo: this.updateUserInfo,
    }
    return (
      <main>
        <header className='App__header'>
          <Header/>
        </header>
        <CapsuleContext.Provider value={contextValue}>
          <Switch>
            <Route exact path='/'>
              <LandingPage loaded={this.state.loaded} error={this.state.error} />
            </Route>
            <Route exact path='/register' component={RegistrationForm}/>
            <Route exact path='/login' component={LoginPage}/>
            <Route exact path='/capsules'>
               <CapsulesPage capsules={this.state.capsules} handleDelete={this.handleDelete} handleUpdateData={this.handleUpdateData} />
            </Route>
            <Route exact path='/addcapsule'>
              <AddCapsulePage handleAddCapsule={this.handleAddCapsule} />
            </Route>
          </Switch>
        </CapsuleContext.Provider>
      </main>
    );
  }
}

export default App;