import React from 'react';
import { Button } from '@material-ui/core';
import './Popup.css';
export default function Popup(props) {
    return (props.trigger)?(
        <div className="popup">
            <div className="popup-inner">
                <Button variant='contained'>Close</Button>
                {props.children}
            </div>
            
        </div>
    ): " ";
}
