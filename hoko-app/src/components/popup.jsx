import React, { Component, useState } from 'react';
import './styles.css'
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';

function Popup({ content, handleClose }) {

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>x</span>
                {content}
            </div>
        </div>
    );
}

export default Popup;