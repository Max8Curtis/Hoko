import React, { Component } from 'react';

function Map({image, character, width}) { 
        return (
            <div>
                <img src={image} style={{ width: width, heigh: '100%'}}/>
            </div>
        );
}
 
export default Map;