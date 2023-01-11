import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Main from './pages/main/main'
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

function App() {
  // const [data, setdata] = useState({
  //   video_id: "",
  //   title: "",
  // });

  // useEffect(() => {
  //   fetch("/data").then((res) => 
  //     res.json().then((data) => {
  //       setdata({
  //         video_id: data.Video_id,
  //         title: data.Title,
  //       });
  //     })
  //   );
  // }, []);

  return (
    <>
      <Main />
    </>
  );
}

export default App;
