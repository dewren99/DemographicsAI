import React, {Component} from 'react';
import Nav from './comps/navs/nav';
import Signin from './comps/signin/signin';
import Signup from './comps/signup/signup';
import './App.css';
import Logo from './comps/logo/logo.js';
import ImageLink from './comps/imageLink/image_link';
import FaceRecognition from './comps/faceRecog/face_recog';
import Particles from 'react-particles-js';
import {Helmet} from "react-helmet";
import Favicon from 'react-favicon';

import Clarifai from 'clarifai';

const app = new Clarifai.App({apiKey: 'e143dc4e73f5412fa930149a95587fa1'});

const particleParams = {
    particles: {
        number: {
            value: 75,
            density: {
                enable: true,
                value_area: 2000
            }
        },
        color: {
            value: "#ffffff"
        },
        line_linked: {
            shadow: {
                enable: true,
                color: "#3CA9D1",
                blur: 5
            }
        }
    }
}

const TITLE = 'DemographicsAI'

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgURL: '',
            imgBox: '',
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                joined: data.joined
            }
        })
    }

    calculateBoxLocation = (data) => {
        const faces = data.outputs[0].data.regions;
        // const demographicsData = data.outputs[0].data.regions.data.face;
        let arrOfBoxes = [];
        let i;
        const img = document.getElementById('inputImg');
        const width = Number(img.width);
        const height = Number(img.height);
        for (i = 0; i < faces.length; i++) {
            let faceBoxLocation = {
                leftCol: '',
                topRow: '',
                rightCol: '',
                bottomRow: '',
                demographicsData: {
                    age: '',
                    gender: '',
                    race: ''
                }
            };
            faceBoxLocation.leftCol = faces[i].region_info.bounding_box.left_col * width;
            faceBoxLocation.topRow = faces[i].region_info.bounding_box.top_row * height;
            faceBoxLocation.rightCol = width - (faces[i].region_info.bounding_box.right_col * width);
            faceBoxLocation.bottomRow = height - (faces[i].region_info.bounding_box.bottom_row * height);

            // faceBoxLocation.leftCol =faces[i].region_info.bounding_box.left_col * width
            // faceBoxLocation.topRow = faces[i].region_info.bounding_box.top_row * height;
            // faceBoxLocation.rightCol = (faces[i].region_info.bounding_box.right_col *
            // width) - (faces[i].region_info.bounding_box.right_col.left_col * width);
            // faceBoxLocation.bottomRow = (faces[i].region_info.bounding_box.bottom_row *
            // height) - (faces[i].region_info.bounding_box.top_row * height)

            faceBoxLocation.demographicsData.age = faces[i].data.face.age_appearance.concepts[0].name;
            faceBoxLocation.demographicsData.gender = faces[i].data.face.gender_appearance.concepts[0].name;
            faceBoxLocation.demographicsData.race = faces[i].data.face.multicultural_appearance.concepts[0].name;

            arrOfBoxes[i] = faceBoxLocation;
        }

        return {arr: arrOfBoxes}
    }

    drawBox = (imgBox) => {
        this.setState({imgBox: imgBox});
    }

    onInput = (event) => {
        this.setState({input: event.target.value});
    }

    onSubmit = () => {
        this.setState({imgURL: this.state.input});

        app
            .models
            .predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input)
            .then(response => this.drawBox(this.calculateBoxLocation(response)))
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    onEnterPress = (key) => {
        var code = key.keyCode || key.which;
        if (code === 13) {
            this.setState({imgURL: this.state.input});

            app
                .models
                .predict(Clarifai.DEMOGRAPHICS_MODEL, this.state.input)
                .then(response => this.drawBox(this.calculateBoxLocation(response)))
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className="App">
                <Helmet>
                    <title>{TITLE}</title>
                </Helmet>
                <Favicon
                    url="https://raw.githubusercontent.com/dewren99/Face-Detection/master/face_detection/public/favicon.ico"/>
                <Particles className='particles' params={particleParams}/>
                <Nav
                    currRoute={this.state.route}
                    isSignedIn={this.state.isSignedIn}
                    onRouteChange={this.onRouteChange}/> {this.state.route === 'home'
                    ? <div>
                            <Logo/>
                            <ImageLink
                                onInput={this.onInput}
                                onSubmit={this.onSubmit}
                                onEnterPress={this.onEnterPress}/>
                            <FaceRecognition imgURL={this.state.imgURL} imgBox={this.state.imgBox}/>
                        </div>

                    : (this.state.route === 'signin'
                        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        : <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
}
            </div>
        );
    }
}

export default App;