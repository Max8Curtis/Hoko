import React, { Component, useState } from 'react';
import './styles.css'
import Tooltip from '@mui/material/Tooltip';

function Target({chosenTarget, borderRadius}) {

    return (
        
        <img src={chosenTarget} style={{width: '100%', height: '100%', borderRadius: borderRadius}}/>

    );
}

export default Target;