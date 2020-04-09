import React from 'react';
import sign from '../../Images/redzone-sign.png';
import './Landing-page.css';

const LandingPage = () => {
    return (
        <div className='container'>

            <div className='info'>
                <h1 className='heading'>RedZone</h1>
                <hr className='line'></hr>
                <p className='landingpage'>Keeping track of your spending. Use make users keep track of thier money easier Remember to avoid the redzone. For a demonstration, log in with "DemoUser" as the Username and "Demouser123!" as the Password.</p>
            </div>
            <div className='image'>
                <img
                    src={sign}
                    alt='RedZone Sign. From Google'
                    className='image-sign'
                />
            </div>
            <div className='Copyright'>Copyright &copy; 2020 - <a href='https://github.com/msanders454'>Michael Sanders</a></div>
        </div>
    )
}

export default LandingPage;