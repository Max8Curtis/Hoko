import React, { Component } from 'react';

function Map({image, character, width}) { 
        return (
            <div>
                <img src={image} style={{ width: width, height: '90%'}}/>
            </div>
        );
}
 
export default Map;