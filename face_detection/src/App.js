import React, {Component} from 'react';
import Nav from './comps/navs/nav';
import './App.css';
import Logo from './comps/logo/logo.js';
import ImageLink from './comps/imageLink/image_link';
import Particles from 'react-particles-js';

const particleParams = {
  particles: {
    number:{
      value:150,
      density:{
        enable:true,
        value_area:2000
      }
    },
    color:{
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

class App extends Component{
  render(){
    return (
      <div className="App">
      <Particles className='particles'
      params={particleParams}
      />
      <Nav />
      <Logo />
      <ImageLink />
      {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
