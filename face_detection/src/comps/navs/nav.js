import React from 'react';

const Nav = ({ onRouteChange, isSignedIn }) =>{
        if(isSignedIn)
        {
            return(
            <nav>
            <p onClick={() => onRouteChange('signout')} className=''>
                Sign Out
            </p>
            </nav>
            );
        }
        else{
            return(
            <nav>
            <p onClick={() => onRouteChange('signin')} className=''>
                Sign in
            </p>
            <p onClick={() => onRouteChange('signup')} className=''>
                Sign Up
            </p>
            </nav>
            );
        }
}

export default Nav;