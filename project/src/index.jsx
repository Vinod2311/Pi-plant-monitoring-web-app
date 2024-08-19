import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/homePage'
import { StrictMode } from 'react'

import { BrowserRouter,Route,Navigate,Routes, Link } from "react-router-dom";
import SignUpPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';
import AboutPage from './pages/aboutPage';



const App = () => {
    
  return (
    <>
      <StrictMode>
        <ChakraProvider >
          <BrowserRouter>
                <Routes>
                  <Route path='/signup' element={<SignUpPage/>}/>
                  <Route path='/' element={<HomePage />}/>
                  <Route path='/login' element={<LoginPage />}/>
                  <Route path='/signup' element={<HomePage />}/>
                  <Route path='/about' element={<AboutPage />}/>
                </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </StrictMode>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
