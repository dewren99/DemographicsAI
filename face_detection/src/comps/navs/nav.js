import React from 'react';

const Nav = ({ onRouteChange }) =>{
    return(
        <nav>
        <p onClick={() => onRouteChange('signin')} className=''>
            Sign Out
        </p>
        </nav>
    );
}

export default Nav;