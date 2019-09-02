import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';

const Logo = () => {
    return (
        <div className=" ">
            <Tilt
                className="Tilt inline-flex items-center"
                options={{
                max: 30,
                scale: 1.2
            }}
                style={{
                height: 250,
                width: 250
            }}>
                <div className="Tilt-inner">
                    <a href="http://www.denizevrendilek.com/"><img alt="Deniz Eren Evrendilek" src="./logo_transparent.png"/></a>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;