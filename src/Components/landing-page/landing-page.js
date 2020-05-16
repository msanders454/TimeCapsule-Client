/* eslint-disable react/prop-types */
import React from 'react'
import './landing-page.css';
import techimage from '../../Images/techimage.png'


//Landing page

const LandingPage = () => {
    return (
        <div className='container'>

            <div className='info'>
                <hr className='line'></hr>
                <p className='landingpage'>Time Capsule is an app used for sending messages that can be accessed only by your future self, whether it&apos;s tomorrow, a month from now, or in five years. Use this to send reminders, words of encouragement to a future self, or just document your favorite Meme right now.</p>
            </div>
            <div className='image'>
               <img className='techimage' src={techimage} alt="techimage" />;
            </div>
        </div>
    )
}

export default LandingPage;