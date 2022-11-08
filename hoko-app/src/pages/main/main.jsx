import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { TitleWrapper, Title } from './styles'
import Button from '../../components/button'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import resetImage from '../../assets/restart_icon.png'
import micImage from '../../assets/mic_icon.png'
import helpImage from '../../assets/help_icon.png'
import undoImage from '../../assets/undo_icon.png'

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

function Main() {
    return (
        <Box sx={{ height: '100%' }} style={{backgroundColor: "#D2E3DF"}}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                <Grid item xs={12}>
                    {/* <item>1</item> */}
                    <h1 style={{fontSize: 60}}>方向</h1>
                </Grid>
                <Grid item xs={12}>
                    {/* <item>2</item> */}
                    <h2>Hōkō</h2>
                </Grid>
                <Grid item xs={12} style={{marginTop:50}}>
                    <Grid container justifyContent="center" alignItems="center" spacing={4}>
                        <Grid item x={1}>
                            <Grid container justifyContent="center" direction="column" spacing={2} alignItems="baseline">
                                <Grid item>
                                    <Button item xs={1} bid={0} buttonImage={resetImage}/>
                                </Grid>
                                <Grid item>
                                    <Button item xs={1} bid={1} buttonImage={undoImage}/>
                                </Grid>
                                <Grid item>
                                    <Button item xs={1} bid={2} buttonImage={micImage}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <div style={{height:400, width:700,backgroundColor:'blue', borderRadius:8}}></div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Main;