import React, { Component, useState } from 'react';
import './styles.css'
import Tooltip from '@mui/material/Tooltip';

function Dialog({text, width, height, rows}) {

    return (
        <div>
            <textarea value={text} style={{width: width, borderRadius: 6}} rows={rows}/>
        </div>
    );
}

export default Dialog;