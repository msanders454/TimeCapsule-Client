import React, { Component } from 'react';
import config from '../../config';
import RedZoneContext from '../../RedZoneContext'
import ExpenseForm from '../../ExpenseForm/ExpenseForm';
import './addExpense.css';

export default class AddExpense extends Component {
    static contextType = RedZoneContext;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    handleSubmit = (expense, callback) => {
        this.setState({ error: null })
        console.log(callback)
        console.log(expense)
        fetch(config.API_ENDPOINT, {
            method: "POST",
            body: JSON.stringify(expense),
            headers: {
                "content-type": "application/json",
            }
        })
            .then(res => {
                if (!res.ok) return res.json().then(error => Promise.reject(error));
                console.log(res);
                return res.json();
            })
            .then(data => {

                callback(data);
                console.log(data);
                this.context.addExpense(data);
                this.props.history.push("/expenses");
            })
            .catch(error => {
                console.error(error);
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