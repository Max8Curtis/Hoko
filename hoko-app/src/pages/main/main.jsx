import React, { useState, useEffect, useRef } from 'react';
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
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

function Main() {

    const errorMsg = 'Your voice was unrecognizable, please repeat.'

    const resetRef = useRef(null);
    const [data, setdata] = useState({
        msgData: {
            id: "",
            displayText: "",
            kanjiText: "",
            displayType: "kanji",
            error: {
                displayError: false,
                errorChars: []
            }
        }
    });

    function fetchData() {
        fetch("/data").then((res) =>
            res.json().then((data) => {
                setdata({
                    msgData: data.message
                });
            })
        );
        console.log(data)
        console.log(data.msgData)
    };

    function swapData() {
        if (data.msgData['displayType'] == 'romaji') {
            setdata({
                msgData: {
                    id: data.msgData['id'],
                    displayText: data.msgData['kanjiText'],
                    kanjiText: data.msgData['kanjiText'],
                    displayType: 'kanji',
                    error: {
                        displayError: data.msgData.error['displayError'],
                        errorChars: data.msgData.error['errorChars']
                    }
                }
            });
        } else {
            fetch("/switch", {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(data)
            }).then((res) =>
                res.json().then((data) => {
                    setdata({
                        msgData: data.message
                    });
                })
            );
        }
    };

    function getSpeech() {
        fetch("/speak").then((res) =>
            res.json().then((data) => {
                setdata({
                    msgData: data.message
                });
            })
        );
    }

    function undoMove() {
        fetch("/undo").then((res) =>
        res.json().then((data) => {
            setdata({
                msgData: data.message
            });
        })
    );
    }

    return (
        <Box sx={{ height: '100%' }} style={{ backgroundColor: "#D2E3DF" }}>
            <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                <Grid item xs={12}>
                    {/* <item>1</item> */}
                    <h1 style={{ fontSize: 60, fontFamily: 'MS Mincho' }}>方向</h1>
                </Grid>
                <Grid item xs={12}>
                    {/* <item>2</item> */}
                    <h2 style={{ fontSize: 40, fontFamily: 'MS Mincho' }}>Hōkō</h2>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 30 }}>
                    <Grid container justifyContent="center" alignItems="center" spacing={12}>
                        <Grid item x={1}>
                            <Grid container justifyContent="center" direction="column" spacing={2} alignItems="baseline">
                                <Grid item>
                                    <Button item xs={1} bid={0} buttonImage={resetImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Reset to start'} handleClick={fetchData} />
                                    <h2 className='button-label'>Reset</h2>
                                </Grid>
                                <Grid item>
                                    <Button item xs={1} bid={1} buttonImage={undoImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Undo previous move'} handleClick={undoMove}/>
                                    <h2 className='button-label' style={{ paddingLeft: 8 }}>Undo</h2>
                                </Grid>
                                <Grid item>
                                    <Button item xs={1} bid={2} buttonImage={micImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Speak to move character'} handleClick={getSpeech} />
                                    <h2 className='button-label'>Speak</h2>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <div style={{ height: 400, width: 700, backgroundColor: 'blue', borderRadius: 8 }}></div>
                        </Grid>
                        <Grid item>
                            <Button item xs={1} bid={3} buttonImage={helpImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'How to play'} />
                            <h2 className='button-label' style={{ paddingLeft: 8 }}>Help</h2>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <Grid container direction="column" alignItems="flex-end">
                        <Dialog text={data.msgData['displayText']} />
                        <Grid container direction="row" justifyContent="space-between">
                            <div>
                                {data.msgData['error']['displayError'] &&
                                    <p style={{color: "red"}}>{errorMsg}</p>                                    
                                }
                            </div>
                            <Button item xs={1} bid={3} buttonImage={resetImage} buttonWidth={90} buttonHeight={25} buttonText={data.msgData['displayType']} imageWidth={20} tooltipText={'Switch between Japanese scripts'} handleClick={swapData} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Main;