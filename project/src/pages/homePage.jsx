import { Container, Flex,Button,Box, IconButton, Stack, useColorModeValue } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import React from "react"

const HomePage = () =>{

  return(
    <>
    <Container maxWidth='100vw' bg='#A0A5CB' >
      <Flex w='100vw' h='100vh' >
        <Box>
          <Flex minH='60px' w={'100vw'} align={'center'} borderStyle={'solid'}
        bg={useColorModeValue('white', 'gray.800')} justifyContent={'flex-end'}>
          <flex>
            <Stack direction={'row'} justify={'flex-end'} flex={{ base: 1, md: 0 }}> 
              <Button bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
                Home
              </Button>
              <Button bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
                Sign-up
              </Button>
              <Button bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
                Log-in
              </Button>
              <Button bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
                About
              </Button>
            </Stack>
            </flex>
          </Flex>

        </Box>
      </Flex>
    </Container>
    </>
  );
};

export default HomePage