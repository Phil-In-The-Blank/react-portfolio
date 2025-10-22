import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, createTheme, CssBaseline, Button } from '@mui/material';
import { AppMenu } from './shared/Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Resume } from './pages/Resume';
import { Map } from './pages/Map';

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
    {label: "Resume", to: "/resume"},
    {label: "Division Loot Map (WIP)", to: "/map"}
  ]

  const resumePositions = [
    {time: '2023-2025', title: 'Edmunds GovTech: Software Developer', 
      details: [
        "Skills: Angular  (Typescript, CSS, HTML), Cypress, SpringBoot, Java, MySQL, Python",
        "Created Cypress testing framework for end-to-end testing of multiple applications",
        "Worked alongside QA to modify test database for application state configuration",
        "Implemented support of multiple payment processor API’s in Angular applications",
        "Documented application processes for QA department to follow such as account" + 
        "creation and login flow with expected error handling in various situations",
        "Modified Angular application initialization sequence for pre-initialization network calls",
        "Designed and built reusable search component for various user billing account types",
        "Designed and implemented user registration and password management interfaces",
        "Implemented payment and fee calculation logic across Angular and Python applications" + 
        " for both one time payment and recurring autopayment processing"
      ]
    },
    {time: '2020-2023', title: 'Aveva (formerly OSISoft): Software Developer 1',
      details: [
        "Skills: Angular (Typescript, CSS, HTML), Cypress, Git, Agile, JSON, REST, YAML",
        "Created reusable database setup and teardown routines for Cypress tests",
        "Created reusable components to manage available servers based on access rights",
        "Migrated custom Angular libraries to use Angular Material libraries for basic visuals",
        "Created CI Pipeline script in YAML to validate SVG icon library",
        "Monitored and maintained minimal network traffic standards across multiple applications from multiple teams"
      ]
    },
    {time: '2019', title: 'OSISoft: Software Developer Intern',
      details: [
        "Aided in refactor of data display to utilize more server-side calculations over client side",
        "Developed custom url history for API interactive tool for favoriting previous API calls",
        "Aided in site maintenance via numerous bug fixes",
        "Maintained high standard for unit testing any features and bug fixes",
      ]
    },
    {time: '2017 & 2018', title: 'Avail Technologies Incorporated: Software Developer Intern (Multiple Internships)',
      details: [
        "Modified Bus Debug Utility to use Bing Rest Map Provider for gps simulation",
        "Created Windows services of the necessary bus modules to run in .Net Core 2.0",
        "Utilized factories to create control modes for Traffic Signal Priority devices",
        "Developed logic to open and close screens on driver display from bus events",
        "Created functions for driver Lock Out mode to limit screen interaction while driving",
        "Communicated between the Angular Driver Display application with a back-end program to send, receive, and process data from each other through web requests"
      ]
    },
    {time: '', title:'Software Languages and Skills', 
      details: [
        "Strong: Angular, Typescript, HTML, CSS, Object Oriented Programming, Git, Agile, Cypress, JSON",
        "Proficient: C#/.Net, Python, YAML, REST, Java, MySQL",
        "Basic: COBOL, YAML, AWS Cloud Services, SpringBoot, React"
      ]
    },
    {time: 'B.S. of Computer Science at Indiana University of Pennsylvania 2020', title:'Education', details: []}

  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <AppMenu routes={routes}></AppMenu>
        <Routes>
          <Route path="/" element={<><Home></Home></>}/>
          <Route path="/resume" element={<><Resume positions={resumePositions}></Resume></>}/>
          <Route path="/map" element={<><Map></Map></>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
