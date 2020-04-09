import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { Section } from '../../Utils';

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    };

    constructor(props) {
        super(props)
    }

    handleLoginSuccess = (userName) => {
        const { location, history } = this.props;
        console.log(this.props);
        const destination = (location.state || {}).from || '/expenses';
        history.push(destination);
    };

    render() {
        return (
            <Section className='LoginPage'>
                <LoginForm onLoginSuccess = {this.handleLoginSuccess} />
            </Section>
        );
    }
}