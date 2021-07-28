import React from 'react';
import './title.css';
const Title=({text}) => {
    return (
        <div>
            <div className='title-container'>
                <label className='title-label'>{text}</label>
            </div> 
        </div>
    )
}

export default Title;
