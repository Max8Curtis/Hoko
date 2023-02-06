// import logo from './logo.svg';
import React from 'react';
import './App.css';
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
      isBlocked: false,
      config: {
          target: "",
          map: "",
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
              errorChars: []
            }
          }
      }
    };
  }

  assignState = (data) => {
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
    this.setState({config: newConfig })
  }
  
  // handleSave = async () => {
  //   const audioBlob = await fetch(this.state.blobURL).then((r) => r.blob());
  //   const audioFile = new File([audioBlob], 'voice.mp3', { type: 'audio/mp3' });
  //   const formData = new FormData(); // preparing to send to the server

  //   formData.append('file', audioFile);  // preparing to send to the server

  //   fetch("/audio", {
  //     method: 'POST',
  //     mode: 'cors',
  //     body: formData
  //   })
  //   .then(async (res) => {
  //     const data = await res.json()
  //     this.state.config = data
  //     console.log(data);
  //     if (!res.ok) {
  //       const err = (data && data.message) || res.status;
  //       return Promise.reject(err);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };


    //API functions
  //Can upgrade to a POST, sending number of targets to choose from
  startGame = () => {
      fetch('/start').then(async (res) => {
          const data = await res.json();
          this.assignState(data)
          console.log(this.state.config)
      })
      .catch((err) => {
          console.log(err);
      });
      
  }

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

  stop = async () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
      }).catch((e) => console.log(e));

      // handleSave();
    
    const audioBlob = await fetch(this.state.blobURL).then((r) => r.blob());
    const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
    const formData = new FormData(); // preparing to send to the server
    formData.append('file', audioFile);  // preparing to send to the server
    
    // console.log(formData)
    // console.log(formData.get('file'))
    for (var [key, value] of formData.entries()) { 
      console.log(key, value);
    }
    
    fetch("/audio", {
      method: 'POST',
      mode: 'cors',
      body: formData
    })
    .then(async (res) => {
      const data = await res.json();
      this.assignState(data)
      if (!res.ok) {
        const err = (data && data.message) || res.status;
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
          data.message['data']['displayText'] = this.state.config['data']['kanjiText']
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
        <Main start={this.start} stop={this.stop} recording={this.state.isRecording} audioURL={this.state.blobURL} config={this.state.config} reset={this.resetGame} undo={this.undoMove} switchText={this.switch} startGame={this.startGame} />
      </>
    );
  }
}

export default App;
