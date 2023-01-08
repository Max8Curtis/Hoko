import React, { Component } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

import MapSquare from './map-square';

function Map({image, character, width, height, charRow, charCol, charDir}) { 
        return (
            <div style={{ backgroundImage:`url(${image})`, flexGrow:1, backgroundSize:'cover', backgroundRepeat:"no-repeat", width:width, height:height }} >
                <Box sx={{flexGrow: 0}}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                {charRow == 0 && charCol == 0 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 0 && charCol == 0) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 1 && charCol == 0 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 1 && charCol == 0) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 2 && charCol == 0 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 2 && charCol == 0) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 3 && charCol == 0 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 3 && charCol == 0) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 4 && charCol == 0 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 4 && charCol == 0) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                {charRow == 0 && charCol == 1 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 0 && charCol == 1) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 1 && charCol == 1 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 1 && charCol == 1) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 2 && charCol == 1 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 2 && charCol == 1) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 3 && charCol == 1 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 3 && charCol == 1) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 4 && charCol == 1 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 4 && charCol == 1) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                {charRow == 0 && charCol == 2 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 0 && charCol == 2) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 1 && charCol == 2 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 1 && charCol == 2) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 2 && charCol == 2 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 2 && charCol == 2) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 3 && charCol == 2 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 3 && charCol == 2) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 4 && charCol == 2 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 4 && charCol == 2) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                {charRow == 0 && charCol == 3 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 0 && charCol == 3) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 1 && charCol == 3 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 1 && charCol == 3) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 2 && charCol == 3 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 2 && charCol == 3) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 3 && charCol == 3 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 3 && charCol == 3) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 4 && charCol == 3 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 4 && charCol == 3) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                {charRow == 0 && charCol == 4 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 0 && charCol == 4) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 1 && charCol == 4 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 1 && charCol == 4) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 2 && charCol == 4 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 2 && charCol == 4) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 3 && charCol == 4 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 3 && charCol == 4) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 4 && charCol == 4 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 4 && charCol == 4) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                {charRow == 0 && charCol == 5 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 0 && charCol == 5) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 1 && charCol == 5 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 1 && charCol == 5) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 2 && charCol == 5 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 2 && charCol == 5) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 3 && charCol == 5 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 3 && charCol == 5) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 4 && charCol == 5 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 4 && charCol == 5) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                {charRow == 0 && charCol == 6 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 0 && charCol == 6) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 1 && charCol == 6 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 1 && charCol == 6) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 2 && charCol == 6 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 2 && charCol == 6) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 3 && charCol == 6 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 3 && charCol == 6) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {charRow == 4 && charCol == 6 &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={true} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                                {!(charRow == 4 && charCol == 6) &&
                                    <Grid item>                                  
                                        <MapSquare width={width} height={height} displayChar={false} rotation={charDir} character={character}/>                                   
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>             
        );
}
 
export default Map;