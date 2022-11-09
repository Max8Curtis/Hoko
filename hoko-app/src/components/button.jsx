import React, { Component, useState } from 'react';
import './styles.css'
import Tooltip from '@mui/material/Tooltip';

function Button({bid, buttonImage, buttonWidth, buttonHeight, buttonText, imageWidth, tooltipText}) {

    return (
        <div>
            <Tooltip title={tooltipText} placement="right" arrow>
                <button style={{width: buttonWidth, height: buttonHeight, borderRadius: 8}}>
                    <div className="flex-container">
                        <p style={{marginTop: -5}}>{buttonText}</p>
                        <img src={buttonImage} style={{paddingLeft: 5, width: imageWidth, height: '100%'}}></img>
                    </div>
                </button>
                </Tooltip>
        </div>
    );
}

export default Button;