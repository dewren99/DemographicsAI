import React from 'react';
import './nav.css'

const Nav = ({onRouteChange, isSignedIn, currRoute}) => {
    if (isSignedIn) {
        return (

            <div className="button">
            <p
                onClick={() => onRouteChange('signout')}
                className="toSigninButton f6 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba border-box"> 
                <svg className="w1" data-icon="chevronLeft" viewBox="0 0 32 32">
                    <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
                </svg>
                <span>Sign out</span>
            </p>
        </div>



            // <nav>
            //     <p onClick={() => onRouteChange('signout')} className='button'>
            //         Sign Out
            //     </p>
            // </nav>
        );
    } else if (currRoute === 'signup' || currRoute === 'signout') {
        return (

            <div className="button">
                <p
                    onClick={() => onRouteChange('signin')}
                    className="toSigninButton f6 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba border-box">
                    <svg className="w1" data-icon="chevronLeft" viewBox="0 0 32 32">
                        <path d="M20 1 L24 5 L14 16 L24 27 L20 31 L6 16 z"></path>
                    </svg>
                    <span>Sign in</span>
                </p>
            </div>
        );
    } else {
        return (
            <nav></nav>
        );
    }
}

export default Nav;