/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Button2, Required, Form, Input2 } from '../../Utilities/Utils';
import AuthApiService from '../../apiServices/auth-api-service';
import './RegistrationForm.css';

/*
* Used to accept user input and check Autherization status to create a new account. 
*/ 
export default class RegistrationForm extends Component {
    constructor(props) {
        super(props)
        this.state = { error: null };
    }
    static defaultProps = {
        onRegistrationSuccess: () => {}
    }

    handleSubmit = ev => {
        ev.preventDefault();
        this.setState({ error: null });
        const { full_name, user_name, password } = ev.target;
        AuthApiService.postUser({
            full_name: full_name.value,
            user_name: user_name.value,
            password: password.value,
        })
            .then(user => {
                full_name.value = '';
                user_name.value = '';
                password.value = '';
                this.props.onRegistrationSuccess()
                this.props.history.push('/login')
                console.log(this.props)
            })
                .catch(res => {
                    this.setState({ error: res.error })
                })
    };

    render() {
        const { error } = this.state;
        return (
            <Form className='RegistrationForm' onSubmit={this.handleSubmit}>
                <div role='alert' className= 'alert'>{error && <p className='red'>{error}</p>}</div>
                <div className='full_name'>
                    <h2 className = 'registration'>Register Here</h2>
                    <hr />
                    <label htmlFor='RegistrationForm__full_name'>
                        Full Name <Required />
                    </label>
                    <Input2
                        name='full_name'
                        type='text'
                        required
                        id='fullname'
                        autoComplete='off'
                    ></Input2>
                </div>
                <div className='user_name'>
                    <label htmlFor='RegistrationForm__user_name'>
                        Username <Required />
                    </label>
                    <Input2
                        name='user_name'
                        type='text'
                        required
                        id='user_name'
                        autoComplete='off'
                    ></Input2>
                </div>
                <div className='password'>
                    <label htmlFor='RegistrationForm__password'>
                        Password <Required />
                    </label>
                    <p className='Criteria'>(Must have 8 characters with one upper-case letter, one lower-case letter, one number, an one special character)</p>
                    <Input2
                        className='RegistrationForm__Password__Input'
                        name='password'
                        type='password'
                        required
                        id='password'
                        autoComplete='off'
                    ></Input2>
                </div>
                <Button2 type='submit' className='submit'>Register</Button2>
            </Form>
        );
    }
}