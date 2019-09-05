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
                        data-key
                        ={"face" + i}
                        style={{
                        top: imgBox.arr[i].topRow,
                        right: imgBox.arr[i].rightCol,
                        bottom: imgBox.arr[i].bottomRow,
                        left: imgBox.arr[i].leftCol
                    }}>
                        <div className="faceNumber">
                            <p>{i + 1}</p>
                        </div>
                    </div>
                )
            }
            console.log('Number of faces: ' + numOfFaces)
            return faceLocationsArr;
        }

        const faceLocationsArr = createFaceBoxes();

        const displayDemographicsData = () => {
            let dataArr = [];
            let i;
            for (i = 0; i < numOfFaces; i++) {
                dataArr.push(
                    <div
                        className={"DemographicsData"}
                        key={"face" + i}
                        data-key
                        ={"face" + i}
                        style={{
                        visibility: 'visible'
                    }}>

                        <h2 className="">{"Face number " + Number(i + 1)}</h2>

                        <p className="">{"Age Appearance: " + imgBox.arr[i].demographicsData.age}</p>
                        <p className="">{"Gender Appearance: " + imgBox
                                .arr[i]
                                .demographicsData
                                .gender
                                .charAt(0)
                                .toUpperCase() + imgBox
                                .arr[i]
                                .demographicsData
                                .gender
                                .slice(1)}</p>
                        <p className="">{"Multicultural Appearance: " + imgBox
                                .arr[i]
                                .demographicsData
                                .race
                                .charAt(0)
                                .toUpperCase() + imgBox
                                .arr[i]
                                .demographicsData
                                .race
                                .slice(1)}</p>
                    </div>
                )
            }
            return dataArr;
        }

        const dataArr = displayDemographicsData();

        return (
            <div>
                <div className='grid-container'>
                    <div className="right-side">
                        {dataArr}
                    </div>
                    <div className="ba b--black-20 middle-area"></div>
                    <div className='imageLocation absolute'>
                        <img
                            className="inputImg"
                            id='inputImg'
                            alt=''
                            src={imgURL}
                            width='400px'
                            height='auto'/> {faceLocationsArr}</div>
                    <div className="left-top-side"></div>
                    <div className="left-bottom-side"></div>
                </div>
                <div
                    className="spacer"
                    ></div>
                <div className="mobile-right-side">
                    {dataArr}
                </div>
            </div>
        );
    } else {
        return (
            <div className='grid-container'>
                <div className=""></div>
                <div className="ba b--black-20 middle-area"></div>
                <div className='imageLocation absolute'><img
                    className="inputImg"
                    id='inputImg'
                    alt=''
                    src={imgURL}
                    width='400px'
                    height='auto'/></div>
                <div className="left-top-side"></div>
                <div className="left-bottom-side"></div>
            </div>
        );
    }
}

export default FaceRegonition;