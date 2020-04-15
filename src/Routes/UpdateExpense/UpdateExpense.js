/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import RedZoneContext from '../../RedZoneContext';
import config from '../../config';
import ExpenseForm from '../../ExpenseForm/ExpenseForm';

/*
* Used to patch user expense logs.
*/ 
export default class UpdateExpense extends Component {
    static contextType = RedZoneContext;

    state = {
        error: null,
        id: null,
        date: null,
        amount: null,
        style: null,
        description: null,
    };
    componentDidMount() {
        const { expenseId } = this.props.match.params;
        fetch(`https://serene-ridge-50508.herokuapp.com/api/expenses/${expenseId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        })
            .then(res => {
                if (!res.ok) return res.json().then(error => Promise.reject(error));

                return res.json();
            })
            .then(responseData => {
                this.setState({
                    id: responseData.id,
                    date: responseData.date,
                    amount: responseData.amount,
                    style: responseData.style,
                    description: responseData.description,
                    usernumber: responseData.usernumber
                });
            })
            .catch(error => {
                this.setState({ error });
            });
    }
    handleSubmit = (expense, callback) => {
        this.setState({ error: null })
        const { expenseId } = this.props.match.params;
        fetch(config.API_ENDPOINT + `/${expenseId}`, {
            method: 'PATCH',
            body: JSON.stringify(expense),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(res => {
                if (!res.ok)
                return res.json().then(error => Promise.reject(error))
            })
            .then(() => {
                callback(callback)
                this.context.updateExpense(expense)
                this.props.history.push('/expenses')
            })
            .catch(error => {
                console.error(error)
                this.setState({ error })
            })
    }
    handleClickCancel = () => {
        this.props.history.push('/expenses')
    };

    render() {
        const { error, id, date, amount, style, description, usernumber } = this.state;
        const expense = { id, date, amount, style, description, usernumber}
        return (
            <section className='EditExpense'>
                {id && (
                    <ExpenseForm
                        onSubmit={this.handleSubmit}
                        onCancel={this.handleClickCancel}
                        error={error}
                        expense={expense}
                    />
                )}
            </section>
        );
    }
}