import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/dosis';
import '@fontsource-variable/montserrat';

const theme = extendTheme({
  textStyles: {
    textFunky: {
      fonts:{
        heading: 'gj',
        body: 'f'
      },
      fontWeight: 'bold',
    }
  },
})

export default theme