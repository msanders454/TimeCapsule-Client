import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const SideBar = () => {
    return (
        <div className='sidebar'>

            <li>
                <NavLink to='/budget' activeClassName='active'>
                   Change Red Zone Amount
                </NavLink>
            </li>
             <li>
                <NavLink to='/expenses' activeClassName='active'>
                    All Expenses
                </NavLink>
            </li>
            <li>
                <NavLink to='/addExpense' activeClassName='active'>
                    Add Expense
                </NavLink>
            </li>
            <li>
                <NavLink to='/statistics' activeClassName='active'>
                    Am I in the RedZone?
                </NavLink>
            </li>
            
        </div>
    );
}

export default SideBar;
