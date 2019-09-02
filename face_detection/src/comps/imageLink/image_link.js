import React from 'react';
import './imageLink.css'

const ImageLink = ({onInput, onSubmit}) => {
    return (
        <div className="imageLink vw-50 vh-45">
            <div className="imageSearchBox">
                <input
                    className="input b ph input-reset ba b--black bg-transparent"
                    type='text'
                    placeholder='Enter Picture URL'
                    size = 'auto'
                    onChange={onInput}/>

                <span className="imageLinkOnHoverText">
                    <p>Will guess your age, gender, multicultural appearance based on the image of
                        your face. Don't worry if you don't have a picture with just your face. This
                        smart robot can detect your face from any type of picture as long as its visible</p>
                </span>

            </div>
            <div className="submit-button">
                <button
                    className="button b ph input-reset ba1 b--black bg-transparent grow pointer"
                    onClick={onSubmit}>
                    Detect
                </button>
            </div>
        </div>
    );
}

export default ImageLink;