import React, { Component } from 'react';
import LandingPage from './Routes/Landing-page/Landing-page';
import Header from './Header/Header';
import LoginPage from './Routes/LoginPage/LoginPage';
import RegistrationForm from './Routes/ReistrationPage/ReistrationForm';
import Statistics from './Routes/Statistics/Statistics';
import AddExpense from './Routes/addExpense/addExpense';
import ExpenseList from './Routes/ExpenseList/ExpenseList';
import RedZoneAmount from './Routes/RedZoneAmount/RedZoneAmount';
import NotFoundPage from './Routes/NotFoundPage/NotFoundPage'
import UpdateExpense from './Routes/UpdateExpense/UpdateExpense';
import SideBar from './SideBar/Sidebar';
import { Route, Switch, withRouter } from 'react-router-dom';
import RedZoneContext from './RedZoneContext';
import config from './config';

const exclusionArray = ["/", "/login", "/register"];
class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        expenses: [],
        userName: "test123",
        usernumber: 0,
        red_zone_amount: 0,
        RedZoneAlert: false,
        error: null,
        };
    }


  updateUserInfo  = newName => {
    console.log(newName);
    this.setState({ 
        userName: newName
     });
     fetch(`https://serene-ridge-50508.herokuapp.com/api/users/${this.state.userName}`, {
          method: "GET",
          headers: {
              "content-type": "application/json",
          }
      })
          .then(res => {
              if (!res.ok) {
                  console.log('not ok')
                  throw new Error(res.status);
              }
              console.log('is ok')
              return res.json();
          })
          .then(this.getUserInfo)
          .catch(error => this.setState({ error }));
  };

  getUserInfo  = user => {
    console.log(user);
    this.setState({ 
      usernumber: user.id,
      red_zone_amount: user.red_zone_amount
   });
   console.log(this.state);
   this.getList()
};

    setExpenses = expenses => {
        this.setState({
            expenses,
            error: null
        })
    }

    updateExpense = updatedExpense => {
      this.setState({
          expenses: this.state.expenses.map(ex =>
              (ex.id !== updatedExpense.id) ? ex : updatedExpense
          )
      })
  }

  updateRedZoneAmount = updatedRedZone => {
    this.setState({
      red_zone_amount: updatedRedZone
    })
}

    addExpense = expense => {
        this.setState({
            expenses: [...this.state.expenses, expense]
        })
    }


    deleteExpense = expenseId => {
        const newExpenses = this.state.expenses.filter(ex => ex.id !== expenseId)
        this.setState({
            expenses: newExpenses
        })
    }


    getList() {
        fetch(`https://serene-ridge-50508.herokuapp.com/api/users/${this.state.usernumber}`, {
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
            .then(this.setExpenses)
            .catch(error => this.setState({ error }));
    }

    render() {
        const { location } = this.props;
        const contextValue = {
            expenses: this.state.expenses,
            userName: this.state.userName,
            usernumber: this.state.usernumber,
            red_zone_amount: this.state.red_zone_amount,
            addExpense: this.addExpense,
            deleteExpense: this.deleteExpense,
            updateExpense: this.updateExpense,
            updateUserInfo: this.updateUserInfo,
            updateRedZoneAmount : this.updateRedZoneAmount,
            RedZoneAlertFalse: this.RedZoneAlertFalse,
            RedZoneAlertTrue: this.RedZoneAlertTrue
        }
        return (
            <div>
                <header className='App__header'>
                    <Header />
                </header>
                {exclusionArray.indexOf(location.pathname) < 0 && <SideBar />}
                <main className='App'>
                  <RedZoneContext.Provider value={contextValue}>
                    <Switch>
                      <Route exact path='/'
                        component={LandingPage} />
                      <Route exact path='/register'
                        component={RegistrationForm}/>
                      <Route exact path='/login'
                        component={LoginPage}/>
                        <Route exact path='/budget'
                        component={RedZoneAmount} />
                      <Route exact path='/expenses'
                        component={() => <ExpenseList expenses={this.state.expenses} red_zone_amount={this.state.red_zone_amount}/>}
                            />
                      <Route exact path='/addExpense'
                        component={AddExpense} />
                      <Route exact path='/statistics'
                        component={Statistics} />
                      <Route exact path='/update/:expenseId'
                        component={UpdateExpense} />

                      <Route component={NotFoundPage} />
                        
                    </Switch>
                  </RedZoneContext.Provider>
                </main>
            </div>
        );
    }
}

export default withRouter(App);