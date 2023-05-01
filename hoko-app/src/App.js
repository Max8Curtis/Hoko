// import logo from './logo.svg';
import React from 'react';
import './App.css';
import './components/styles.css';
import { useState, useEffect } from 'react';
import Main from './pages/main/main'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: '',
      isProcessing: false,
      isBlocked: false,
      config: {
          target: "",
          map: "1",
          char_row: 4,
          char_col: 3,
          char_dir: 0,
          game_won: false,
          at_game_start: true,
          data: {
            displayText: "",
            kanjiText: "",
            displayType: "kanji",
            error: {
              displayError: false,
              errorChars: [],
              invalidMove: false
            }
          }
      },
      invalidMove: false,
      game_started: false, // Set true when `start` button is pressed
    };
  }
  

  toggleWinPopup = () => {
    this.startGame()
  };


  toggleInvalidMovePopup = () => {
    this.setState({invalidMove: !this.state.invalidMove})
  }

  assignState = (data) => {
    console.log(data)
    const newDataConfig = {
      displayText: data.message['data']['displayText'],
      kanjiText: data.message['data']['kanjiText'],
      displayType: data.message['data']['displayType'],
      error: data.message['data']['error']
    }

    const newConfig = {
      target: data.message['target'], 
      map: data.message['map'],
      char_row: data.message['char_row'],
      char_col: data.message['char_col'],
      char_dir: data.message['char_dir'],
      game_won: data.message['game_won'],
      at_game_start: data.message['at_game_start'],
      data: newDataConfig
    }
    this.setState({invalidMove: data.message['data']['error']['invalidMove']}, () => console.log(this.state.config['data']['error']['invalidMove']))
    this.setState({config: newConfig })
  };

  /**
   * Add styling to highlight errored characters in the user's speech
   */  
  getEditedText = (text, error_chars) => {
    var s = text.split("");
    var s_new = "";
    for (var i = 0; i < s.length; i++) {
        if (error_chars.includes(i)) {
            var s_new = s_new + "<mark class='error-char'>" + s[i] + "</mark>";
        } else {
            var s_new = s_new + s[i];
        }
    };
    return s_new
  };


  /**
   * Get start config for game
   */
  startGame = () => {
      fetch('/start').then(async (res) => {
          const data = await res.json();
          this.assignState(data)          
          this.state.game_started = true
      })
      .catch((err) => {
          console.log(err);
      });
      
  }

  /**
   * Start recording user speech
   */
  start = () => {
    if (this.state.isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          this.setState({ isRecording: true });
        }).catch((e) => console.error(e));
    }
  };

  /**
   * Send audio file as form to API endpoint
   */
  sendAudio = (form) => {
    fetch("/audio", {
      method: 'POST',
      mode: 'cors',
      body: form
    })
    .then(async (res) => {
      const data = await res.json();
      this.state.isProcessing = false;
      var edited_text = this.getEditedText(data.message['data']['displayText'], data.message['data']['error']['errorChars']);
      data.message['data']['displayText'] = edited_text;
      this.assignState(data);
      console.log(this.state.invalidMove);

      if (!res.ok) {
        const err = (data && data.message) || res.status;
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  /**
   * Stop recording user speech
   */
  stop = async () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        this.state.isProcessing = true;
        const file = new File(buffer, 'voice.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
        const formData = new FormData(); // preparing to send to the server
        formData.append('file', file);  // preparing to send to the server
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
        this.sendAudio(formData)
      }).catch((e) => console.log(e));
  };

  resetGame = () => {
    fetch("/reset").then(async (res) => {
      const data = await res.json();
      this.assignState(data)
      console.log("Game has been reset")
      if (!res.ok) {
        const err = (data && data.message) || res.status;
        return Promise.reject(err);
      }
      })
      .catch((err) => {
        console.log(err);
      });
    };

  undoMove = () => {
    fetch("/undo").then(async (res) => {
      const data = await res.json();
      this.assignState(data)
      console.log(data)
      if (!res.ok) {
        const err = (data && data.message) || res.status;
        return Promise.reject(err);
      }
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(this.state.config)
    };

  switch = () => {
    if (this.state.config['data']['displayType'] == 'romaji') {
      const data = {'message': this.state.config}
      data.message['data']['displayText'] = this.getEditedText(this.state.config['data']['kanjiText'], this.state.config['data']['error']['errorChars'])
      data.message['data']['displayType'] = 'kanji'
      this.assignState(data)             
    } else {
      fetch("/switch", {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(this.state.config)
      }).then(async (res) => {
          const data = await res.json()
          this.assignState(data)
      });
    }
  };

  componentDidMount() {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        this.setState({ isBlocked: false });
      },
      () => {
        console.log('Permission Denied');
        this.setState({ isBlocked: true })
      },
    );
  }

  render(){
    return (
      <>
        <Main start={this.start} stop={this.stop} recording={this.state.isRecording} audioURL={this.state.blobURL} config={this.state.config} reset={this.resetGame} undo={this.undoMove} switchText={this.switch} startGame={this.startGame} gameStarted={this.state.game_started} processing={this.state.isProcessing} winPopup={this.toggleWinPopup} invalidMove={this.state.invalidMove} />
      </>
    );
  }
}

export default App;
