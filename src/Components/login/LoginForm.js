/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import CapsuleContext from '../CapsuleContext';
import TokenService from '../../apiServices/token-service';
import AuthApiService from '../../apiServices/auth-api-service';
import { Button2, Form, Input2, Required } from '../../Utilities/Utils';
import './LoginForm.css';


/*
* Used to create login form and to activated JWT Authentication.
*/ 
export default class LoginForm extends Component {
    static contextType = CapsuleContext;

    static defaultProps = {
        onLoginSuccess: () => {},
        updateUserInfo: () => {}
    }

    state = { error: null }
/*
*Function used compare user info with the credentials and recieve a token for access.
*/ 
    handleSubmitJwtAuth = ev => {
        ev.preventDefault()
        this.setState({ error: null })
        const { user_name, password } = ev.target

        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
        })
        .then(res => {
            this.context.updateUserInfo(user_name.value)
            console.log(this.context);
            user_name.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.onLoginSuccess()
        })


        .catch(res => {
            this.setState({ error: res.error })
        })
    }

    render() {
        const { error } = this.state;
        return (
                 <Form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
                    <div role='alert' className= 'alert'>{error && <p className='red'>{error}</p>}</div>
                    <div className='username'>
                        <h2 className='login'>Login</h2>
                        <hr />
                        <label htmlFor='LoginForm__user_name'>
                            Username <Required />
                        </label>
                        <Input2
                            required
                            name='username'
                            id='user_name'
                            autoComplete='off'
                            placeholder='Demo123'
                       ></Input2>
                    </div>

                    <div className='password'>
                        <label htmlFor='LoginForm__password'>
                            Password <Required />
                       </label>
                       <Input2
                            required
                            name='password'
                            type='password'
                            id='password'
                            placeholder='Demo123@'
                            autoComplete='off'
                        ></Input2>
                    </div>
                    <Button2 type='submit' className='submit' >Log In</Button2>
                  </Form>
        );
    }
}