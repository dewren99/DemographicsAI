import React from 'react';
import './face_recog.css'

const FaceRegonition = ({imgURL, imgBox}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img 
                id='inputImg'
                 alt=''
                  src={imgURL}
                   width='500px' height='auto'/>
                <div className='bounding-box'
                 style={{
                     top: imgBox.topRow,
                      right: imgBox.rightCol,
                       bottom: imgBox.bottomRow,
                        left: imgBox.leftCol}}>
                </div>
            </div>
        </div>
    );
}

export default FaceRegonition;