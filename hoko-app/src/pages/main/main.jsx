import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { TitleWrapper, Title, Label } from './styles'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Button from '../../components/button'
import Map from '../../components/map'
import Target from '../../components/target'

import resetImage from '../../assets/restart_icon.png'
import micImage from '../../assets/mic_icon.png'
import helpImage from '../../assets/help_icon.png'
import undoImage from '../../assets/undo_icon.png'
import stopImage from '../../assets/stop_icon.png'
import mapImage from '../../assets/map/map_1.png'
import charImage from '../../assets/map/character_1.png'
import startImage from '../../assets/start_icon.png'

import '../../App.css'
import Dialog from '../../components/dialog'
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

//Target images
import Bank from '../../assets/map/bank.png'
import Cinema from '../../assets/map/cinema.png'
import Grocery from '../../assets/map/grocery.png'
import Hospital from '../../assets/map/hospital.png'
import Lake from '../../assets/map/lake.png'
import Osakeya from '../../assets/map/osake_ya.png'
import Parking from '../../assets/map/parking.png'
import Sakanaya from '../../assets/map/sakana_ya.png'
import Shrine from '../../assets/map/shrine.png'

function Main() {

    const resetRef = useRef(null);
    
    const targets = {
        1: {
            name: 'Bank',
            image: Bank,
            japanese: 'ぎんこう'
        },
        2: {
            name: 'Cinema',
            image: Cinema,
            japanese: 'えいがかん'
        },
        3: {
            name: 'Grocery',
            image: Grocery,
            japanese: 'スーパー'
        },
        4: {            
            name: 'Hospital',
            image: Hospital,
            japanese: 'びょういん'
        },
        5: {
            name: 'Lake',
            image: Lake,
            japanese: 'みずうみ'
        },
        6: {
            name: 'Osakeya',
            image: Osakeya,
            japanese: 'おさけや'
        },
        7: {
            name: 'Parking',
            image: Parking,
            japanese: 'パーキング'
        },
        8: {
            name: 'Sakanaya',
            image: Sakanaya,
            japanese: 'さかなや'
        },
        9: {
            name: 'Shrine',
            image: Shrine,
            japanese: 'じんじゃ'
        }
    }

    //Structs
    const errorMsg = 'Your voice was unrecognizable, please repeat.';
    const speakingTooltip = 'Speak to move character';
    const stopTooltip = 'Stop recording speech';
    const [speak, setspeak] = useState({
        speaking: false,
        image: micImage,
        func: getSpeech,
        tooltip: speakingTooltip
    });

    const [gameConfig, setgameConfig] = useState({
        config: {
            target: '',
        }
    });

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

    //Can upgrade to a POST, sending number of targets to choose from
    function startGame() {
        fetch('/start').then((res) =>
            res.json().then((data) => {
                setgameConfig({
                    config: data.message
                });
            })
        );
        console.log(gameConfig.config)
        console.log(targets[gameConfig.config['target']])
    }
    
    //API functions
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

    function stopSpeaking() {
        //pass
        setspeak({
            speaking: false,
            image: micImage,
            func: getSpeech,
            tooltip: speakingTooltip
        })
    }

    function getSpeech() {
        fetch("/speak").then((res) =>
            res.json().then((data) => {
                setdata({
                    msgData: data.message
                });
            })
        );
        setspeak({
            speaking: true,
            image: stopImage,
            func: stopSpeaking,
            tooltip: stopTooltip
        })
    }

    function undoMove() {
        fetch("/undo").then((res) =>
        res.json().then((data) => {
            setdata({
                msgData: data.message
            });
        })
    );
    console.log(data.msgData)
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
                                    <Grid container direction="column" alignItems="center">
                                        <Button item xs={1} bid={0} buttonImage={resetImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Reset to start'} handleClick={fetchData} />
                                        <h2 className='button-label'>Reset</h2>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">
                                        <Button item xs={1} bid={1} buttonImage={undoImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Undo previous move'} handleClick={undoMove}/>
                                        <h2 className='button-label' style={{ paddingLeft: 8 }}>Undo</h2>
                                    </Grid>
                                </Grid>
                                <Grid item alignItems="center">
                                    <Grid container direction="column" alignItems="center">
                                        <Button item xs={1} bid={2} buttonImage={speak.image} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Speak to move character'} handleClick={speak.func} />
                                        <h2 className='button-label'>
                                            {speak.speaking ? 'Stop'  : 'Speak'}
                                        </h2>   
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                                        <Button item xs={1} bid={4} buttonImage={helpImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'How to play'} />
                                        <h2 className='button-label'>Help</h2>
                                    </Grid>
                                
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Map image={mapImage} character={charImage} width={650}/>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                                <Grid item>
                                    <Grid container direction="column" justifyContent="space-evenly" alignItems="center" style={{marginBottom: 60}}>
                                        <h2 className='button-label'>Target:</h2>
                                        <div style={{height: 80, width: 80, borderRadius: 4, border: '1px solid black'}}>
                                            <Target chosenTarget={targets[gameConfig.config['target']]['image']} borderRadius={4}/>
                                        </div>
                                        <h2 className='button-label'>{targets[gameConfig.config['target']]['japanese']}</h2>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                                        <Button item xs={1} bid={3} buttonImage={startImage} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Start new game'} handleClick={startGame}/>
                                        <h2 className='button-label'>Start</h2>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <Grid container direction="column" alignItems="flex-end">
                        <Dialog text={data.msgData['displayText']} width={600} rows={4}/>
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