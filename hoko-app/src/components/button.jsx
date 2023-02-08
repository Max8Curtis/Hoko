import React, { Component, useState } from 'react';
import './styles.css'
import Tooltip from '@mui/material/Tooltip';

function Button({bid, buttonImage, buttonWidth, buttonHeight, buttonText, imageWidth, tooltipText, handleClick, disabled}) {

    return (
        <div>
            <Tooltip title={tooltipText} placement="right" arrow>
                <button style={{width: buttonWidth, height: buttonHeight, borderRadius: 8}} onClick={handleClick} disabled={disabled}>
                    <div className="flex-container">
                        {buttonText?.length &&
                            <div style={{width: 30, marginRight:18}}>
                                <p style={{marginTop: -4}}>{buttonText}</p>
                            </div>
                        }
                        
                        <img src={buttonImage} style={{paddingLeft: 5, width: imageWidth, height: '100%'}}></img>
                    </div>
                </button>
            </Tooltip>
        </div>
    );
}

export default Button;