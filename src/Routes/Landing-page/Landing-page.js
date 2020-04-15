/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import sign from '../../Images/redzone-sign.png';
import './Landing-page.css';

/*
* Used to display the Landing page.
*/ 
const LandingPage = () => {
    return (
        <div className='container'>

            <div className='info'>
                <h1 className='heading'>RedZone</h1>
                <hr className='line'></hr>
                <p className='landingpage'>Use this app in order to keep track of spending habits. You can look at lists and charts of your expenses. Remember to avoid the redzone. Log in with "Demo123" as the Username and "Demo123@" as the Password in order to try out the demo.</p>
            </div>
            <div className='image'>
                <img
                    src={sign}
                    alt='RedZone Sign. From Google'
                    className='image-sign'
                />
            </div>
        </div>
    )
}

export default LandingPage;