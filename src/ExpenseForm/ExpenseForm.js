import React, { Component } from 'react';
import { Required } from '../Utils';
import RedZoneContext from '../RedZoneContext'

const noop = () => {};

export default class ExpenseForm extends Component {
    static contextType = RedZoneContext;
    static defaultProps = {
        onSubmit: noop,
        onCancel: noop,
        expense: {}
    };

    state = {
        id: this.props.expense.id || undefined,
        date: this.props.expense.date || "",
        amount: this.props.expense.amount || "",
        style: this.props.expense.style || "Credit Cards or Loans",
        description: this.props.expense.description || "",
        usernumber: this.props.expense.usernumber || this.context.usernumber
    };

    handleChangeDate = e => {
        this.setState({ 
            date: e.target.value 
        });
    };

    handleChangeAmount = e => {
        this.setState({ 
            amount: e.target.value 
        });
    };

    handleChangeStyle = e => {
        this.setState({ 
            style: e.target.value 
        });
    };

    handleChangeDescription = e => {
        this.setState({ 
            description: e.target.value 
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { id, date, amount, style, description, usernumber } = this.state;
        this.props.onSubmit(
            {
                id,
                date,
                amount,
                style,
                description,
                usernumber
            },
            this.resetFields
            
        );
    };

    resetFields = newFields => {
        this.setState({
            id: newFields.id || undefined,
            date: newFields.date || "",
            amount: newFields.amount || "",
            style: newFields.style || "Credit Cards or Loans",
            description: newFields.description || "",
            usernumber: newFields.usernumber || this.context.usernumber,
        });
    };

    render() {
        const { error, onCancel } = this.props;
        const { id, date, amount, style, description } = this.state;
        return (
            <form className='AddExpenseForm' onSubmit={this.handleSubmit}>
                <div className='error' role='alert'>
                    {error && <p>{error.message}</p>}
                </div>
                {id && <input type='hidden' name='id' value={id} />}

                <div className='ExpenseFormOptions'>
                    <label htmlFor='AddExpenseFormlabel'>Date <Required className='required' /></label>
                    <input
                        name='date'
                        type='date'
                        id='date'
                        value={date}
                        required
                        onChange={this.handleChangeDate}
                    />
                </div>

                <div className='ExpenseFormOptions'>
                    <label htmlFor='AddExpenseFormlabel'>($) Amount<Required className='required' /></label>
                    <input
                        name='amount'
                        type='number'
                        value={amount}
                        id='amount'
                        required
                        placeholder='100 or 100.00'
                        onChange={this.handleChangeAmount}
                    />
                </div>

                <div className='ExpenseFormOptions'>
                    <label htmlFor='AddExpenseFormlabel'>Category <Required className='required' /></label>
                    <select
                        id='style'
                        name='style'
                        value={style}
                        required
                        onChange={this.handleChangeStyle}
                    >
                        
                        <option value='Credit Cards or Loans'>Credit Cards or Loans</option>
                        <option value='Entertainment'>Entertainment</option>
                        <option value='Food'>Food</option>
                        <option value='Housing and Utilities'>Housing and Utilities</option>
                        <option value='Transportation'>Transportation</option>
                        <option value='Travel'>Travel</option>
                        <option value='Family'>Family</option>
                        <option value='Personal care and Clothing'>Personal care and Clothing</option>
                        <option value='Other'>Other</option>
                    </select>
                </div>

                <div className='description'>
                    <label htmlFor='AddExpenseFormlabel'>Description <Required className='required' /></label>
                    <textarea
                        value={description}
                        name='description'
                        id='description'
                        required
                        placeholder='What did you buy?'
                        onChange={this.handleChangeDescription}
                    />
                </div>


                <div><button 
                        type='submit' 
                        className='ExpenseFormButton'
                    >
                        Save
                    </button>
                    
                    {' '}
                    <button
                        type='button'
                        onClick={onCancel}
                        className='ExpenseFormButton'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    }
}

