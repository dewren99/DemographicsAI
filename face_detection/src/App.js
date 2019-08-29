import React from 'react';
import Nav from './comps/navs/nav';
import './App.css';
import Logo from './comps/logo/logo.js';
import ImageLink from './comps/imageLink/image_link';

function App() {
  return (
    <div className="App">
    <Nav />
    <Logo />
    <ImageLink />
    {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
