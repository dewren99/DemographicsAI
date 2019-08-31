import React, {Component} from 'react';
import Nav from './comps/navs/nav';
import Signin from './comps/signin/signin';
import Signup from './comps/signup/signup';
import './App.css';
import Logo from './comps/logo/logo.js';
import ImageLink from './comps/imageLink/image_link';
import FaceRecognition from './comps/faceRecog/face_recog';
import Particles from 'react-particles-js';

import Clarifai from 'clarifai';

const app = new Clarifai.App({apiKey: 'e143dc4e73f5412fa930149a95587fa1'});

const particleParams = {
    particles: {
        number: {
            value: 150,
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

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgURL: '',
            imgBox: {},
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
        const face = data.outputs[0].data.regions[0].region_info.bounding_box;
        const img = document.getElementById('inputImg');
        const width = Number(img.width);
        const height = Number(img.height);
        return {
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width - (face.right_col * width),
            bottomRow: height - (face.bottom_row * height)
        }
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

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particleParams}/>
                <Nav isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/> {this.state.route === 'home'
                    ? <div>
                            <Logo/>
                            <ImageLink onInput={this.onInput} onSubmit={this.onSubmit}/>
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
