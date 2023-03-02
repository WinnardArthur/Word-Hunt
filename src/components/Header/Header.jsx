import { createTheme, MenuItem, TextField, ThemeProvider } from '@mui/material';
import React from 'react';
import './header.css';
import Category from '../../data/category';

const Header = ({ category, setCategory, word, setWord, lightMode}) => {
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: lightMode ? "#ccc" : "#fff"
            },
            type: lightMode ? "light" : "light",
        },
    });

//       const pallete = {
//     lightMode: {
//       backgroundColor: 'white',
//       color: 'black'
//     },
//     coloredMode: {
//       backgroundColor: 'teal',
//       color: 'white'
//     }
//   }


    const handleChange = (language) => {
        setCategory(language)
        setWord('')
    }

    return (
        <div className="header">
            <span className="title">{word ? word : "Word Hunt"}</span>
            <div className="inputs">
                <ThemeProvider theme={darkTheme}>
                    <TextField  
                        label="Search a Word..."
                        className="search"
                        value={word}
                        onChange={e => setWord(e.target.value)}
                    />
                    <TextField
                        className="select"
                        select 
                        label="language"
                        value={category}
                        onChange={(e) => handleChange(e.target.value)}
                    >
                        
                        {Category.map((option) => (
                            <MenuItem key={option.label} value={option.label}>{option.value}</MenuItem>
                        ))}
                        
                    </TextField>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Header
