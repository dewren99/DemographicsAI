import React from 'react';
import './face_recog.css'

const FaceRegonition = ({imgURL, imgBox}) => {

    if (imgBox) {
        const numOfFaces = imgBox.arr.length
        const createFaceBoxes = () => {

            let faceLocationsArr = [];
            let i;
            for (i = 0; i < numOfFaces; i++) {
                faceLocationsArr.push(
                    <div
                        className={"bounding-box"}
                        key={"face" + i}
                        style={{
                        top: imgBox.arr[i].topRow,
                        right: imgBox.arr[i].rightCol,
                        bottom: imgBox.arr[i].bottomRow,
                        left: imgBox.arr[i].leftCol
                    }}></div>
                )
            }
            console.log('Number of faces: ' + numOfFaces)
            return faceLocationsArr;
        }

        const displayDemographicsData = () => {
            let dataArr = [];
            let i;
            for (i = 0; i < numOfFaces; i++) {
                dataArr.push(
                    <div className={"DemographicsData" + i} key={"face" + i}>
                        <p className="">{"Age appearance of " + i + " is " + imgBox.arr[i].demographicsData.age}</p>
                        <p className="">{"Gender appearance of " + i + " is " + imgBox.arr[i].demographicsData.gender}</p>
                        <p className="">{"Multicultural appearance of " + i + " is " + imgBox.arr[i].demographicsData.race}</p>
                    </div>
                )
            }
            console.log('dataArr: ', dataArr);
            return dataArr;
        }

        return (
            <div className="grid-container">
                <div className="left-side">
                    <div className='center ma'>
                        <div className='absolute mt2'>
                            <img id='inputImg' alt='' src={imgURL} width='500px' height='auto'/> {createFaceBoxes()}
                        </div>
                    </div>
                </div>
                <div className="right-side">{displayDemographicsData()}</div>
            </div>
        );
    } else {
        return (
            <div className='left-side'>
                <div className='center ma'>
                    <img id='inputImg' alt='' src={imgURL} width='500px' height='auto'/>
                    <div className='bounding-box' style={{}}></div>
                </div>
            </div>
        );
    }
}

export default FaceRegonition;