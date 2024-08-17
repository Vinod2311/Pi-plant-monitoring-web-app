import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import HomePage from './pages/homePage'
import { StrictMode } from 'react'
import theme from '../theme';

const App = () => {
    
  return (
    <><StrictMode>
        <ChakraProvider theme={theme}>
          <HomePage />
        </ChakraProvider>
      </StrictMode>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
