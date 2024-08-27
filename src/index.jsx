import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/homePage'
import { StrictMode } from 'react'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import { BrowserRouter,Route,Navigate,Routes, Link } from "react-router-dom";
import SignUpPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';
import AboutPage from './pages/aboutPage';
import DashboardPage from './pages/dashboard';
import RegisterPiPage from './pages/registerPiPage';
import AccountPage from './pages/accountPage';
import './index.css'



const App = () => {
    
  return (
    <>
      <StrictMode >
        <ChakraProvider >
          <BrowserRouter>
                <Routes>
                  <Route path='/signup' element={<SignUpPage />}/>
                  <Route path='/' element={<HomePage />}/>
                  <Route path='/login' element={<LoginPage />}/>
                  <Route path='/signup' element={<HomePage />}/>
                  <Route path='/about' element={<AboutPage />}/>
                  <Route path='/registerPi' element={<RegisterPiPage />}/>
                  <Route path='/account' element={<AccountPage />}/>
                  <Route path='/dashboard' element={<DashboardPage/>}/>
                </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </StrictMode>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App/>)
