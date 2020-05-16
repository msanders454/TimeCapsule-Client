/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Section } from '../../Utilities/Utils';
import RegistrationForm from './RegistrationForm';


/*
* Used to create the Registration forms and to direct the render after registering.
*/ 
class RegistrationPage extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    };

    handleREgistrationSuccess = () => {
        const { history } = this.props;
        history.push('/login');
    };

    render() {
        return (
            <Section className='RegistrationPage'>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                    test={this.handleRegistrationSuccess}
                    history={this.props.history}
                />
            </Section>
        );
    }
}

export default RegistrationPage;