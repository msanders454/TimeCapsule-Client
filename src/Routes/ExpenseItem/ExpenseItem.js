/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import RedZoneContext from '../../RedZoneContext';
import { Link } from 'react-router-dom';
import './ExpenseItem.css';

/*
* Used to render the items displayed on the expense logs.
* Props are all user information that were past from ExpenseList
* This component also has its own function for delete.
*/ 
function deleteExpense(expenseId, callback) {
    let confirmDelete = window.confirm('Confirm to delete this expense? Deleted expenses CANNOT be recovered!');
    if (confirmDelete) {
        fetch(`https://serene-ridge-50508.herokuapp.com/api/expenses/${expenseId}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) return res.json().then(error => Promise.reject(error));
            })
            .then(data => {
                callback(expenseId);
            })
            .catch(error => {
            });
    }
}

export default function ExpenseItem(props) {
    return (
        <RedZoneContext.Consumer>
            {context => (
                <div className='expense-container'>

                    <div className='expense-header'>
                    <div className='expense-item'>
                        <span className='ExpenseItemInfo'>{props.description}</span>
                        </div>

                        <div className='expense-item'>
                            <span className='ExpenseItemInfo'>{props.date}</span>
                        </div>

                        <div className='expense-item'>
                            <span className='ExpenseItemInfo'>${props.amount}</span>
                        </div>

                        <div className='expense-item'>
                            <span className='ExpenseItemInfo'>{props.style}</span>
                        </div>

                    </div>

                    <button className='buttonDelete'>
                        <Link to={`/update/${props.id}`}>
                            Update
                        </Link>
                    </button>
                    <button
                        onClick={() => {
                            deleteExpense(props.id, context.deleteExpense);
                        }}
                        className='buttonDelete'
                    >
                       Delete 
                    </button>
                </div>
            )}
        </RedZoneContext.Consumer>
    );
}

ExpenseItem.defaultProps = {
    onClickDelete: () => {},
}
