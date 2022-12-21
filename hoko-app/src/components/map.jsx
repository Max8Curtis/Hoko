import React, { Component } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import MapSquare from './map-square';

function Map({image, character, width, height, charX, charY, rotation}) { 
        return (
            <div style={{ backgroundImage:`url(${image})`, flexGrow:1, backgroundSize:'cover', backgroundRepeat:"no-repeat", width:width, height:height }} >
                <Box sx={{flexGrow: 0}}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Grid item id="1 1">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>                                   
                                </Grid>
                                <Grid item id="2 1">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/> 
                                </Grid>
                                <Grid item id="3 1">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="4 1">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="5 1">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item id="1 2">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="2 2">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="3 2">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="4 2">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="5 2">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item id="1 3">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="2 3">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={90} character={character}/>
                                </Grid>
                                <Grid item id="3 3">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="4 3">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="5 3">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item id="1 4">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="2 4">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="3 4">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="4 4">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="5 4">
                                    <MapSquare width={width} height={height} displayChar={true} rotation={0} character={character}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item id="1 5">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="2 5">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="3 5">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="4 5">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="5 5">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item id="1 6">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="2 6">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="3 6">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="4 6">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="5 6">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item id="1 7">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="2 7">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="3 7">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="4 7">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                                <Grid item id="5 7">
                                    <MapSquare width={width} height={height} displayChar={false} rotation={0} character={character}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                
            </div>             
        );
}
 
export default Map;