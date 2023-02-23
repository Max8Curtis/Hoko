import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import { TitleWrapper, Title, Label } from './styles'

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Button from '../../components/button'
import Map from '../../components/map'
import Target from '../../components/target'
import Popup from '../../components/popup'
import PopupImage from '../../components/popup-image'

import resetImage from '../../assets/restart_icon.png'
import micImage from '../../assets/mic.png'
import helpImage from '../../assets/help_icon.png'
import undoImage from '../../assets/undo_icon.png'
import stopImage from '../../assets/mic_stop.png'
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
import SakeShop from '../../assets/map/sake_shop.png'
import Parking from '../../assets/map/parking.png'
import FishShop from '../../assets/map/fish_shop.png'
import Shrine from '../../assets/map/shrine.png'

import white_square from '../../assets/white_square.png'
import switchBaseClasses from '@mui/material/internal/switchBaseClasses';

function Main({start, stop, recording, audioURL, config, reset, undo, switchText, startGame, gameStarted, processing, winPopup}) {
    let mapImageHeight = 770;
    let mapImageWidth = 1070;
    let mapImageDisplayWidth = 700;
    let mapImageDisplayHeight = (mapImageDisplayWidth / mapImageWidth) * mapImageHeight

    function Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // TODO: Change page to get targets struct from API whenever neeeded, instead of storing here
    const targets = {
        "A": {
            name: 'Grocery',
            image: Grocery,
            japanese: 'スーパー'
        },
        "B": {
            name: 'Fish shop',
            image: FishShop,
            japanese: 'さかなや'
        },
        "C": {
            name: 'Sake shop',
            image: SakeShop,
            japanese: 'おさけや'
        },
        "D": {
            name: 'Lake',
            image: Lake,
            japanese: 'みずうみ'
        },
        "E": {
            name: 'Parking',
            image: Parking,
            japanese: 'パーキング'
        },
        "F": {
            name: 'Shrine',
            image: Shrine,
            japanese: 'じんじゃ'
        },
        "G": {
            name: 'Cinema',
            image: Cinema,
            japanese: 'えいがかん'
        },
        "H": {
            name: 'Bank',
            image: Bank,
            japanese: 'ぎんこう'
        },
        "I": {
            name: 'Hospital',
            image: Hospital,
            japanese: 'びょういん'
        },
    }

    //Structs
    const errorMsg = 'Your voice was unrecognizable, please repeat.';
    const speakingTooltip = 'Speak to move character';
    const stopTooltip = 'Stop recording speech';    

    const [isHelpOpen, setisHelpOpen] = useState(false);
    const [isWinOpen, setisWinOpen] = useState(config['game_won']);
    const [isProcessingOpen, setisProcessingOpen] = useState(processing);

    function toggleHelpPopup() {
        console.log(config)
        console.log(isWinOpen)
        setisHelpOpen(!isHelpOpen);
    }



    function toggleProcessingPopup() {
        // console.log(isWinOpen)
        setisProcessingOpen(!isProcessingOpen);
    }

    return (
        <Box sx={{ height: '100%' }} style={{ backgroundColor: "#D2E3DF" }}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                    {/* <item>1</item> */}
                    <h1 style={{ fontSize: 60, fontFamily: 'MS Mincho' }}>方向</h1>
                </Grid>
                <Grid item xs={12}>
                    {/* <item>2</item> */}
                    <h2 style={{ fontSize: 40, fontFamily: 'MS Mincho' }}>Hōkō</h2>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 15 }}>
                    <Grid container direction="row" alignItems="center" columnSpacing={{ md: 19 }}>
                        <Grid item xs={2.3}>
                            <Grid container justifyContent="center" direction="column" spacing={2} alignItems="center">
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">
                                        <Button item bid={0} buttonImage={resetImage} buttonWidth={70} buttonHeight={70} imageMult={1} tooltipText={'Reset to start'} handleClick={reset} disabled={!gameStarted || config['at_game_start']} />
                                        <h2 className='button-label'>Reset</h2>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">
                                        <Button item bid={1} buttonImage={undoImage} buttonWidth={70} buttonHeight={70} imageMult={1} tooltipText={'Undo previous move'} handleClick={undo} disabled={!gameStarted || config['at_game_start']} />
                                        <h2 className='button-label'>Undo</h2>
                                    </Grid>
                                </Grid>
                                <Grid item alignItems="center">
                                    <Grid container direction="column" alignItems="center">
                                        {recording &&
                                            <Button item bid={2} buttonImage={stopImage} buttonWidth={70} buttonHeight={70} imageMult={0.8} tooltipText={'Speak to move character'} handleClick={stop} disabled={!gameStarted} />
                                        }
                                        {!recording &&
                                            <Button item bid={2} buttonImage={micImage} buttonWidth={70} buttonHeight={70} imageMult={0.8} tooltipText={'Speak to move character'} handleClick={start} disabled={!gameStarted} />
                                        }
                                        {/* <Button item bid={2} buttonImage={speak.image} buttonWidth={70} buttonHeight={70} imageWidth={50} tooltipText={'Speak to move character'} handleClick={turnCharLeft} /> */}
                                        <h2 className='button-label'>
                                            {recording ? 'Stop' : 'Speak'}
                                        </h2>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <audio src={audioURL} controls="controls" hidden/>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                                        <Button item bid={4} buttonImage={helpImage} buttonWidth={70} buttonHeight={70} imageMult={1} tooltipText={'How to play'} handleClick={toggleHelpPopup} />  
                                        <h2 className='button-label'>Help</h2>
                                        {isHelpOpen && <Popup
                                            content={
                                                <>
                                                    <Box sx={{ height: '100%' }}>
                                                        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                                                            <h2>How to play</h2>
                                                            <br></br>
                                                            <p>1. Press Start - a random target will be generated</p>
                                                            <p>2. Press Speak - speak directions in Japanese to move the character around the map towards the target</p>
                                                            <p>     (Saying "go forward" will move the character forward by one square)</p>
                                                            <p>3. When the character is facing the target, you have completed the game!</p>
                                                            <h3>Pronunciation</h3>
                                                            <p>When you speak, your speech will be transcribed to text and displayed in the box below the map.</p>
                                                            <p style={{textAlign: 'center'}}>If part of your speech has unclear pronunciation, the relevant characters will be highlighted in the box below the map. You can then retry the sentence until the pronunciation is perfect!</p>
                                                            <h3>Targets</h3>
                                                            <div>
                                                                <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                                                                    <Grid item>
                                                                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                                            <PopupImage targets={targets} target={"A"} />
                                                                            <PopupImage targets={targets} target={"B"} />
                                                                            <PopupImage targets={targets} target={"C"} />
                                                                            <PopupImage targets={targets} target={"D"} />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                                                                            <PopupImage targets={targets} target={"E"} />
                                                                            <PopupImage targets={targets} target={"F"} />
                                                                            <PopupImage targets={targets} target={"G"} />
                                                                            <PopupImage targets={targets} target={"H"} />
                                                                            <PopupImage targets={targets} target={"I"} />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                    </Box>
                                                </>
                                            }
                                            handleClose={toggleHelpPopup}
                                        />
                                        }
                                        {config['game_won'] && <Popup
                                            content={
                                                <>
                                                    <div style={{textAlign: 'center'}}>
                                                        <h1>Congratulations!</h1>
                                                        <h3>You have successfully navigated to the correct target!</h3>
                                                        <h3>ありがとうございます！</h3>
                                                        <h3></h3>
                                                        <h4>Close this window to start a new game.</h4>
                                                    </div>
                                                </>
                                            }
                                            handleClose={winPopup}
                                        />
                                        }
                                        {processing && <Popup
                                            content={
                                                <>
                                                    <div style={{textAlign: 'center'}}>
                                                        <h1>Your speech is being processed</h1>
                                                        <h3>ちょっと待ってください</h3>
                                                    </div>
                                                </>
                                            }
                                            handleClose={toggleProcessingPopup}
                                        />
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={7.4}>
                            <Map image={mapImage} character={charImage} width={700} height={mapImageDisplayHeight} charRow={config['char_row']} charCol={config['char_col']} charDir={config['char_dir']} style={{ paddingLeft: 50 }} />
                        </Grid>
                        <Grid item xs={2.3}>
                            <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                                <Grid item>
                                    <Grid container direction="column" justifyContent="space-evenly" alignItems="center" style={{ marginBottom: 60 }}>
                                        <Grid item>
                                            <h2 className='button-label'>Target:</h2>
                                        </Grid>
                                        <Grid item>
                                            <div style={{ height: 80, width: 80, borderRadius: 4, border: '1px solid black' }}>
                                                {config['target'] != "" &&
                                                    <Target chosenTarget={targets[config['target']]['image']} borderRadius={4} />
                                                }
                                                {config['target'] == "" &&
                                                    <Target chosenTarget={white_square} borderRadius={4} />
                                                }

                                            </div>
                                        </Grid>
                                        <Grid item>
                                            <div style={{ width: 150, maxWidth: 150, textAlign: 'center' }}>

                                                {config['target'] != "" &&
                                                    <h2 className='button-label'>{targets[config['target']]['japanese']}</h2>
                                                }
                                                {config['target'] == "" &&
                                                    <h2 className='button-label'>-</h2>
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
                                        <Button item bid={3} buttonImage={startImage} buttonWidth={70} buttonHeight={70} imageMult={1} tooltipText={'Start new game'} handleClick={startGame} />
                                        <h2 className='button-label'>Start</h2>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 20 }}>
                    <Grid container direction="column" alignItems="flex-end">
                        <Dialog text={config['data']['displayText']} height={100} width={600} rows={4} />
                        <Grid container direction="row" justifyContent="space-between">
                            <div>
                                {config['data']['error']['displayError'] &&
                                    <p style={{ color: "red" }}>{errorMsg}</p>
                                }
                            </div>
                            <Button item bid={3} buttonImage={resetImage} buttonWidth={90} buttonHeight={25} buttonText={Capitalize(config['data']['displayType'])} imageMult={0.3} tooltipText={'Switch between Japanese scripts'} handleClick={switchText} />
                        </Grid>
                        <div style={{ height: 50, backgroundColor: '#D2E3DF' }}></div>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Main;