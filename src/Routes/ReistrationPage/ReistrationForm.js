import React, { Component } from 'react';
import { Button2, Required, Form, Input2 } from '../../Utils';
import AuthApiService from '../../services/auth-api-service';
import './ReistrationForm.css';

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
        const { full_name, user_name, password, red_zone_amount } = ev.target;
        AuthApiService.postUser({
            full_name: full_name.value,
            user_name: user_name.value,
            password: password.value,
            red_zone_amount: red_zone_amount.value
        })
            .then(user => {
                full_name.value = '';
                user_name.value = '';
                password.value = '';
                red_zone_amount.value = '';
                this.props.onRegistrationSuccess()
                this.props.history.push('/login')
            })
                .catch(res => {
                    this.setState({ error: res.error })
                })
    };

    render() {
        const { error } = this.state;
        return (
            <Form className='RegistrationForm' onSubmit={this.handleSubmit}>
                <div role='alert'>{error && <p className='red'>{error}</p>}</div>
                <div className='full_name'>
                    <h2>Register</h2>
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
                    <p className='PasswordCriteria'>(8 or more characters containing at least ONE of the following: upper-case letter, lower-case letter, number, special character)</p>
                    <Input2
                        className='RegistrationForm__Password__Input'
                        name='password'
                        type='password'
                        required
                        id='password'
                        autoComplete='off'
                    ></Input2>
                </div>
                <div className='red_zone_amount'>
                    <label htmlFor='RegistrationForm__RedZone_amount'>
                        Starting RedZone Budget <Required />
                    </label>
                    <Input2
                        name='red_zone_amount'
                        type='number'
                        required
                        id='red_zone_amount'
                        autoComplete='off'
                    ></Input2>
                </div>
                <Button2 type='submit'>Register</Button2>
                <p className='Note'>Note: You will be redirected to the Log in page upon successful registration.</p>
            </Form>
        );
    }
}