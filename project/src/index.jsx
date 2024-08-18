import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/homePage'
import { StrictMode } from 'react'
import theme from '../theme';
import { BrowserRouter,Route,Navigate,Routes, Link } from "react-router-dom";
import SignUpPage from './pages/signUpPage';
import LoginPage from './pages/loginPage';

const apiCall = () => {
  fetch('http://localhost:8080').then((data) => {
      
  })
}

const App = () => {
    
  return (
    <>
      <StrictMode>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
                <Routes>
                  <Route path='/signup' element={<SignUpPage/>}/>
                  <Route path='/' element={<HomePage />}/>
                  <Route path='/login' element={<LoginPage />}/>
                  <Route path='/signup' element={<HomePage />}/>
                </Routes>
          </BrowserRouter>
        </ChakraProvider>
      </StrictMode>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
