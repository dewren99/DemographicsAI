import React from 'react';
import './face_recog.css'

const FaceRegonition = ({imgURL, imgBox}) => {

    if (imgBox) {
        console.log('Face locations', imgBox.arr)
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
            //console.log('Face locations:', faceLocationsArr)
            return faceLocationsArr;
        }

        const faceLocationsArr = createFaceBoxes();
        console.log("func:", faceLocationsArr);

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
            <div className='center ma'>
                <div className="grid-container">
                    <div className="right-side">{displayDemographicsData()}</div>
                    <div className="ba b--black-20 middle-area"></div>
                    <div className='absolute mt2'>
                        <div className="imageLocation">
                            <div className=""><img
                                className="inputImg"
                                id='inputImg'
                                alt=''
                                src={imgURL}
                                width='350px'
                                height='auto'/> {createFaceBoxes()}</div>
                        </div>
                    </div>
                    <div className="left-top-side"></div>
                    <div className="left-bottom-side"></div>
                </div>
            </div>
        );
    } else {
        return (
            <div className='center ma'>
                <div className="grid-container">
                    <div className="right-side"></div>
                    <div className="ba b--black-20 middle-area"></div>
                    <div className='absolute mt2'>
                        <div className="imageLocation">
                            <div className=""><img
                                className="inputImg"
                                id='inputImg'
                                alt=''
                                src={imgURL}
                                width='350px'
                                height='auto'/></div>
                        </div>
                    </div>
                    <div className="left-top-side"></div>
                    <div className="left-bottom-side"></div>
                </div>
            </div>
        );
    }
}

export default FaceRegonition;