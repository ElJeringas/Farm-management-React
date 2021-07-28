import React from 'react'
import './title.css'

export default function Title({text}) {
    return (
        <div className='title'>
            <label>{text}</label>
        </div>
    )
}
