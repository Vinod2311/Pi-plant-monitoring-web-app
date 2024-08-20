/* eslint-disable no-unused-vars */
import { Button, Flex, GridItem, Stack } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";


const NavMain = () => {
  const navigate = useNavigate()

  

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  };
  return(
    <Flex w='100%' h={'100%'}  paddingTop={'120px'} >
        <Stack direction={'row'} spacing={'50px'}  paddingStart={'200px'}> 
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}} 
            onClick={() => handleMenuSelect('/dashboard')}>
            Dashboard
          </Button>
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}
          onClick={() => handleMenuSelect('/registerPi')}>
            Register Pi
          </Button>
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}
          onClick={() => handleMenuSelect('/account')}>
            Account
          </Button>
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}
          onClick={() => handleMenuSelect('/')}>
            Log-out
          </Button>
        </Stack>
      </Flex>
  )
}

export default NavMain