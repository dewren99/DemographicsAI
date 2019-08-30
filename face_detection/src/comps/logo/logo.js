import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';


const Logo = () =>{
    return(
        <div className=''>
        <Tilt className="Tilt" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
 <div className="Tilt-inner"> LOGO </div>
</Tilt>
        </div>
    );
}

export default Logo;