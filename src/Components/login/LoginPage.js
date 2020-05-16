/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Section } from '../../Utilities/Utils';

/*
* Used to create the login forms and to direct the render after logging in.
*/ 
export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    };

    handleLoginSuccess = () => {
        console.log(this.props)
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/capsules';
        history.push(destination);
    };

    render() {
        return (
            <Section className='LoginPage'>
                <LoginForm onLoginSuccess = {this.handleLoginSuccess} updateUserInfo={this.props.handleUpdateuser} />
            </Section>
        );
    }
}