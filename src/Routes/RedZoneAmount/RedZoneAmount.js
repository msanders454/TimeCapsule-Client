import React, { Component } from 'react';
import config from '../../config';
import RedZoneContext from '../../RedZoneContext'
import ExpenseForm from '../../ExpenseForm/ExpenseForm';
import { Required } from '../../Utils';
import './RedZoneAmount.css';

const noop = () => {};
export default class RedZoneAmount extends React.Component {
    static contextType = RedZoneContext;

    static defaultProps = {
        onSubmit: noop,
        onCancel: noop,
    };


    constructor(props) {
        super(props)
        this.handleChangeAmount = this.handleChangeAmount.bind(this)
    }

    state = {
        error: null,
        red_zone_amount: 0 || "",
    };

    componentDidMount() {
        fetch(`https://serene-ridge-50508.herokuapp.com/api/users/patch/${this.context.usernumber}`, {
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
                    red_zone_amount: responseData.red_zone_amount,
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({ error });
            });
    }

    handleChangeAmount = ev => {
        this.setState({ 
            red_zone_amount: ev.target.value 
        });
    };

    

    
handlePatch = (red_zone_amount, callback) => {
    console.log(red_zone_amount)
    console.log(callback)
    this.setState({ error: null })
    fetch(`https://serene-ridge-50508.herokuapp.com/api/users/patch/${this.context.usernumber}`, {
        method: 'PATCH',
        body: JSON.stringify(red_zone_amount),
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
            console.log(red_zone_amount)
            this.context.updateRedZoneAmount(red_zone_amount.red_zone_amount)
            this.props.history.push('/expenses')
        })
        .catch(error => {
            console.error("High error occured" + error)
            this.setState({ error })
        })
}

    

    handleClickCancel = () => {
        this.props.history.push('/expenses')
    };

    handleSubmit = e => {
        e.preventDefault();
        const { red_zone_amount } = this.state;
        this.handlePatch(
            {red_zone_amount},
            this.resetFields
            
        );
    };

    resetFields = newFields => {
        this.setState({
            red_zone_amount: newFields.red_zone_amount || this.context.red_zone_amount 
        });
    };

    render() {
        const { red_zone_amount } = this.state;
        console.log(this.state);
            return (
                <div className='AddExpenseForm__Options'>
                  <form className='AddExpenseForm' onSubmit={this.handleSubmit}>
                    <label htmlFor='AddExpenseForm__label'>RedZoneAmount <Required className='required' /></label>
                    <input
                        name='red_zone_amount'
                        type='number'
                        id='red_zone_amount'
                        value={red_zone_amount}
                        required
                        onChange={this.handleChangeAmount}
                    />
                    <div>
                    {' '}
                    <button 
                        type='submit' 
                        className='AddExpenseForm__button'
                        //onClick={() => this.handleChangeBudget(RedZoneAmount)}
                    >
                        Save
                    </button>
                </div>
                 </form>
                </div>
                
            );
    }
}