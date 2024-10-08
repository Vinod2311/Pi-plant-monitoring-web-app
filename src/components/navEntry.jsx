
import { Button, Flex, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const NavEntry = () => {

  const navigate = useNavigate()
  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);


  };
  return(
    <Flex w='100%' h={'100%'}  paddingTop={'120px'} >
        <Stack direction={'row'} spacing={'50px'}  paddingStart={'200px'}> 
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}} 
            onClick={() => handleMenuSelect('/')}>
            Home
          </Button>
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}
          onClick={() => handleMenuSelect('/signup')}>
            Sign-up
          </Button>
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}
          onClick={() => handleMenuSelect('/login')}>
            Log-in
          </Button>
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}
          onClick={() => handleMenuSelect('/about')}>
            About
          </Button>
        </Stack>
      </Flex>
  )
}

export default NavEntry