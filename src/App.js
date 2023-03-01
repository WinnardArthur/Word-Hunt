import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Switch, withStyles } from '@material-ui/core';
import Header from './components/Header/Header';
import Definitions from './components/definitions/Definitions';
import { teal } from '@material-ui/core/colors';

function App() {

  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState('');
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false);

  const DarkMode = withStyles({
    switchBase: {
      color: teal[300],
      "&$checked": {
        color: teal[500],
      },
      "&$checked + $track": {
        backgroundColor: teal[500],
      },
    },
    checked: {},
    track: {},
  })(Switch)

 
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
    <div className="App" style={{height: '100vh', backgroundColor: lightMode ? "#fff" : 'teal', color: lightMode ? "black" : 'white', transition: "all .5s linear"}}>
      <Container 
        maxWidth="md" 
        style={{display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-evenly'}}
      >
        <div style={{position: "absolute", top: 0, right: 15, paddingTop: 10}}>
          <span>{lightMode ? "Teal" : "Light"} Mode</span>
          <DarkMode checked={lightMode} onChange={() => setLightMode(!lightMode)} />
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
