import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { TitleWrapper, Title, Label } from './styles'
import Button from '../../components/button'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import resetImage from '../../assets/restart_icon.png'
import micImage from '../../assets/mic_icon.png'
import helpImage from '../../assets/help_icon.png'
import undoImage from '../../assets/undo_icon.png'
import '../../App.css'
import Dialog from '../../components/dialog'

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
                    <h1 style={{fontSize: 60, fontFamily:'MS Mincho'}}>方向</h1>
                </Grid>
                <Grid item xs={12}>
                    {/* <item>2</item> */}
                    <h2 style={{fontSize: 40, fontFamily:'MS Mincho'}}>Hōkō</h2>
                </Grid>
                <Grid item xs={12} style={{marginTop:30}}>
                    <Grid container justifyContent="center" alignItems="center" spacing={12}>
                        <Grid item x={1}>
                            <Grid container justifyContent="center" direction="column" spacing={2} alignItems="baseline">
                                <Grid item>
                                    <Button item xs={1} bid={0} buttonImage={resetImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Reset to start'}/>
                                    <h2 className='button-label'>Reset</h2>
                                </Grid>
                                <Grid item>
                                    <Button item xs={1} bid={1} buttonImage={undoImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Undo previous move'}/>
                                    <h2 className='button-label' style={{paddingLeft:8}}>Undo</h2>
                                </Grid>
                                <Grid item>
                                    <Button item xs={1} bid={2} buttonImage={micImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Speak to move character'}/>
                                    <h2 className='button-label'>Speak</h2>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <div style={{height:400, width:700,backgroundColor:'blue', borderRadius:8}}></div>
                        </Grid>
                        <Grid item>
                            <Button item xs={1} bid={3} buttonImage={helpImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'How to play'}/>
                            <h2 className='button-label' style={{paddingLeft:8}}>Help</h2>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{marginTop:20}}>
                    <Grid container direction="column" alignItems="flex-end">
                        <Dialog/>
                        <Button item xs={1} bid={3} buttonImage={resetImage} buttonWidth={90} buttonHeight={25} buttonText={'Romaji'} imageWidth={20} tooltipText={'Switch between Japanese scripts'}/>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Box>
    );
}

export default Main;