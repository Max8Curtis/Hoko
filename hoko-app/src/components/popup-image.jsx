import React, { Component, useState } from 'react';
import './styles.css'
import { Grid } from '@mui/material';

function PopupImage({targets, targetNumber}) {

    return (
        <Grid item>
            <div style={{marginLeft: 20, marginTop: 10}}>
                <Grid container direction="column" alignItems="center">              
                    <img src={targets[targetNumber]['image']} className="popup-image" />
                    <h2 className='button-label'>{targets[targetNumber]['name']}</h2>
                    <h2 className='button-label'>{targets[targetNumber]['japanese']}</h2>            
                </Grid>
            </div>
        </Grid>
    );
}

export default PopupImage;