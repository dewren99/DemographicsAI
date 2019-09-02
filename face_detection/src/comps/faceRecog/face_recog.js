import React from 'react';
import './face_recog.css'

const FaceRegonition = ({imgURL, imgBox}) => {
    if (imgBox) {
        console.log("imgBox: ", imgBox)
        console.log("imgBox.arr: ", imgBox.arr[0].leftCol)
        const myroot = document.createElement('div')
        const element = document.createElement('p')

        // element.textContent = 'DIV HERE'
        // element.className = 'divv'
        // myroot.appendChild(element)
        myfunc = ()=> {return console.log('func called')}
        return (
            
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputImg' alt='' src={imgURL} width='500px' height='auto'/>
                    <div
                        className='bounding-box'
                        style={{
                        top: imgBox.arr[0].topRow,
                        right: imgBox.arr[0].rightCol,
                        bottom: imgBox.arr[0].bottomRow,
                        left: imgBox.arr[0].leftCol
                    }}>{myfunc()}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputImg' alt='' src={imgURL} width='500px' height='auto'/>
                    <div className='bounding-box' style={{}}></div>
                </div>
            </div>
        );
    }
}

export default FaceRegonition;