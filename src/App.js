import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
import Header from './components/Header/Header';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Definitions from './components/definitions/Definitions';
import { Box } from '@mui/system';

function App() {

  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState('');
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);
  const [coloredMode, setColoredMode] = useState(true);


  const pallete = {
    lightMode: {
      backgroundColor: 'white',
      color: 'black'
    },
    coloredMode: {
      backgroundColor: 'teal',
      color: 'white'
    }
  }

 
  useEffect(() => {
    const dictionaryApi = async () => {
      try {
        const {data} = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
        )
      console.log(data)
      setMeanings(data)
  
      } catch (err) {
        console.log(err)
      }
    }

    dictionaryApi();
  }, [word, category])

  console.log('cat', category)

  return (
    <div className="App" style={{height: '100vh', backgroundColor: lightMode ? pallete.lightMode.backgroundColor : pallete.coloredMode.backgroundColor, color: lightMode ? pallete.lightMode.color : pallete.coloredMode.color, transition: "all .5s linear"}}>
      <Container 
        maxWidth="md" 
        style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-evenly'}}
      >
        <div style={{position: "absolute", top: 0, right: '2rem', paddingTop: 20, paddingBottom: 10}}>
          <Box display='flex'>
            <Box>
              {coloredMode && <LightModeIcon sx={{fontSize: '2rem', '&:hover': {cursor: 'pointer'}}} onClick={() => {
                setColoredMode(false);
                setLightMode(true)
              }}/>}
              {lightMode && <DarkModeIcon  sx={{fontSize: '1.5rem', '&:hover': {cursor: 'pointer'}}} onClick={() => {
                setColoredMode(true);
                setLightMode(false)
              }}/>}
              
            </Box>
          </Box>
        </div>
        <Header 
          category={category} 
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          lightMode={lightMode}
        />
        {meanings && <Definitions word={word} meanings={meanings} category={category} lightMode={lightMode}/>}
      </Container>
    </div>
  );
}

export default App;
