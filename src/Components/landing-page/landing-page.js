/* eslint-disable react/prop-types */
import React from 'react'
import './landing-page.css';
import techimage from '../../Images/techimage.png'

const LandingPage = () => {
    return (
        <div className='container'>

            <div className='info'>
                <hr className='line'></hr>
                <p className='landingpage'>Time Capsule is an app for sending messages that can be accessed only by your future self, whether tomorrow, a month from now, or in five years. Use it to send reminders, pass encouragement to a future version of you, or just document what your life is like right now.</p>
            </div>
            <div className='image'>
               <img className='techimage' src={techimage} alt="techimage" />;
            </div>
        </div>
    )
}

export default LandingPage;