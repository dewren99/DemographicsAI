import React from 'react';
import './face_recog.css'

const FaceRegonition = ({imgURL, imgBox}) => {

    if (imgBox) {
        const createFaceBoxes = () => {
            const numOfFaces = imgBox.arr.length
            console.log(numOfFaces + ' faces found!')
            let faceLocationsArr = [];
            let i;
            for (i = 0; i < numOfFaces; i++) {
                faceLocationsArr.push(
                    <div
                        className={"bounding-box" + i}
                        style={{
                        top: imgBox.arr[i].topRow,
                        right: imgBox.arr[i].rightCol,
                        bottom: imgBox.arr[i].bottomRow,
                        left: imgBox.arr[i].leftCol
                    }}></div>
                )
            }
            return faceLocationsArr;
        }

        return (

            <div className='center ma'>
                <div className='absolute mt2'>
                    <img id='inputImg' alt='' src={imgURL} width='500px' height='auto'/> {createFaceBoxes()}
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