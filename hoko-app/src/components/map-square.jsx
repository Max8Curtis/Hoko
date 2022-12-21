import React, { Component } from 'react';

function MapSquare({width, height, displayChar, rotation, character}) { 
    return(
        <div style={{width:(width / 7), height: (height / 5), alignItems:'center', justifyContent:'center', paddingTop:18, paddingLeft:16}}>
            {displayChar &&
                <img src={character} style={{transform: `rotate(${rotation}deg)`}}/>
            }                                
        </div>
    );
}

export default MapSquare