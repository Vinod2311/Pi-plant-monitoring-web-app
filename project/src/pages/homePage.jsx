import { Container, Flex,Button,Box, IconButton, Stack, useColorModeValue, Grid, GridItem, Image, Text } from "@chakra-ui/react";
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
import '@fontsource/zcool-xiaowei';
import React from "react"


const HomePage = () =>{

  return(
    <>
    <Container maxWidth='100%'minWidth='1000px' h='100%' minHeight={'800px'} bg='#A0A5CB' paddingInlineEnd={'0'} paddingInlineStart={'0'}>
      <Flex  >
        <Grid w='100vw' 
         gridTemplateColumns={'1fr 1fr 1fr 1fr'} gridTemplateRows={'400px 1fr 10px'}
         templateAreas={`"logo nav nav nav"
                        "main1 main1 main2 main2"
                        "footer footer footer footer"`}>
          <GridItem  area={'nav'}>
              <Flex w='100%' h={'100%'}  alignItems={"center"} >
                <Stack direction={'row'} spacing={'50px'}  paddingStart={'100px'}> 
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
              </Flex>
            </GridItem>
            <GridItem area={'logo'}>
              <Box >
                <Image src='../../logo.png' alt='logo' />
              </Box>
            </GridItem>
            <GridItem area={'main1'}>
              <Box >
                <Text  fontFamily='ZCOOL XiaoWei' fontWeight='bold' paddingStart={'120px'} paddingEnd={'40px'} align={'center'} fontSize={'5xl'}>
                  Create Your Own      Plant Monitoring System
                </Text>
                <Button colorScheme='blue'>Button</Button>
              </Box>
            </GridItem>
            <GridItem area={'main2'}>
              <Box h={'100%'}>
                <Image w={'100%'} h={'100%'} src='../../landing-page.jpg' alt='landing page image' />
              </Box>
            </GridItem>
            <GridItem area={'footer'} bg={'white'}>
              <h>
                This is the footer
              </h>
            </GridItem>
        </Grid>
      </Flex>
    </Container>
    </>
  );
};


export default HomePage