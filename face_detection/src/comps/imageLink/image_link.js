import React from 'react';

const ImageLink = ({onInput, onSubmit}) => {
    return(
        <div>
            <p>

            </p>
            <div className=''>
                <input 
                className='' 
                type='text' 
                placeholder='Enter The Picture URL'
                 onChange={onInput}/>

                <button 
                className=''
                onClick={onSubmit}>
                Detect
                </button>
            </div>
        </div>
    );
}

export default ImageLink;