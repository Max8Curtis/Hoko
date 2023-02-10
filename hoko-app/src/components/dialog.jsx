import React, { Component, useState } from 'react';
import './styles.css'
import Tooltip from '@mui/material/Tooltip';

function Dialog({text, width, height, rows}) {
    
    return (
        <div>
            <div style={{padding: 5, height: height, width: width, outline: '2px solid #65A4D1', borderRadius: 6, backgroundColor: 'white', marginBottom: 4}}><p dangerouslySetInnerHTML={{ __html: text}} style={{fontSize: 20}}></p></div>
            {/* <textarea value={text} style={{width: width, borderRadius: 6}} rows={rows} /> */}
        </div>
    );
}

export default Dialog;