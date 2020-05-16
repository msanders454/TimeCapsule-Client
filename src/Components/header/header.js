import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import TokenService from '../../apiServices/token-service';
import './header.css';

export default class Header extends Component {
    state = {
        rerendor: false
      };

      //Function used to show logout button

    renderLogoutLink() {
        return (
            <div className='Header__logged-in'>
                <Link
                    onClick={() =>this.handleLogoutClick()}
                    to='/'
                >
                    Log out
                </Link>
            </div>
        )
    }
    //Function used to show login button
    renderLoginLink() {
        return (
            <div className='Header__not-logged-in'>
                <Link
                    to='/login'
                >
                    Log in
                </Link>
                <Link
                    to='/register'
                >
                    Register
                </Link>
            </div>
        )
    }
    //Function starts logout function and deletes token
    handleLogoutClick() {
        this.setState({ rerendor: true });
        TokenService.clearAuthToken()
    }
    render() {
        return (
            <nav className='Header'>
                <h1>
                        Time Capsule
                </h1>
                <section className='SignOut'>
                    {
                        TokenService.hasAuthToken()
                            ? this.renderLogoutLink()
                            : this.renderLoginLink()
                    }
                </section>
            </nav>
        );
    }
}