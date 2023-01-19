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
    };
  }

  handleSave = async () => {
    const audioBlob = await fetch(this.state.blobURL).then((r) => r.blob());
    const audioFile = new File([audioBlob], 'voice.mp3', { type: 'audio/mp3' });
    const formData = new FormData(); // preparing to send to the server

    formData.append('file', audioFile);  // preparing to send to the server

    fetch("/audio", {
      method: 'POST',
      mode: 'cors',
      body: formData
    })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        const err = (data && data.message) || res.status;
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

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
    console.log(formData)
    
    fetch("/audio", {
      method: 'POST',
      mode: 'cors',
      body: formData
    })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        const err = (data && data.message) || res.status;
        return Promise.reject(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
        <Main start={this.start} stop={this.stop} recording={this.state.isRecording} audioURL={this.state.blobURL} />
      </>
    );
  }
}

export default App;
