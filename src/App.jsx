import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, createTheme, CssBaseline, Button } from '@mui/material';
import { AppMenu } from './shared/Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';

const theme = createTheme({
  palette: {mode: 'light', 
    primary: { main: '#6750A4'}, 
    secondary: {main: '#2F6FED'},
    info:     { main: '#17A2B8' },
    success:  { main: '#2E7D32' },
    warning:  { main: '#ED6C02' },
    error:    { main: '#D32F2F' },
    neutral:  { 
      50:'#F7F7FA',
      100:'#EEEFF5',
      200:'#DCDD E7',
      300:'#C4C8D9',
      400:'#A7AEC6',
      500:'#8C95B2',
      600:'#6E7793',
      700:'#545C73',
      800:'#3C4355',
      900:'#2A2F3C' }
    },
    typography: { fontFamily: 'Inter, system-ui, sans-serif' }
})

function App() {
  const [count, setCount] = useState(0)

  const routes = [
    {label: "Home", to: "/"},
    {label: "Resume", to: "/resume"}
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <AppMenu routes={routes}></AppMenu>
        <Routes>
          <Route path="/" element={<><Home></Home></>}/>
          <Route path="/resume" element={<><Resume></Resume></>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
