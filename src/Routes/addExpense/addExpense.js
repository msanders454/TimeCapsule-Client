/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import config from '../../config';
import RedZoneContext from '../../RedZoneContext'
import ExpenseForm from '../../ExpenseForm/ExpenseForm';
import './addExpense.css';

/*
* Used to add expenses by using post. This data as well as the function to cancel 
* gets past to expenseform 
*/ 
export default class AddExpense extends Component {
    static contextType = RedZoneContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    handleSubmit = (expense, callback) => {
        this.setState({ error: null });
        fetch(config.API_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
                "content-type": "application/json",
            }
        })
            .then(res => {
                if (!res.ok) return res.json().then(error => Promise.reject(error));
                return res.json();
            })
            .then(data => {
                callback(data);
                this.context.addExpense(data);
                this.props.history.push("/expenses");
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    handleClickCancel = () => {
        this.props.history.push('/expenses')
    };

    render() {
        const { error } = this.state;
            return (
                <div className='AddExpensePage'>
                    <ExpenseForm
                        error={error}
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleClickCancel}
                    />
                </div>
            );
    }
}