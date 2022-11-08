import React, { Component, useState } from 'react';

function Button({bid, buttonImage}) {

    return (
        <div>
            <button style={{width: 70, height: 70, borderRadius: 8}}>
                <img src={buttonImage} style={{width: 50}}></img>
            </button>
        </div>
    );
}

export default Button;