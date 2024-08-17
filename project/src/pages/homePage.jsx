import { Container, Flex,Button,Box, IconButton, Stack, useColorModeValue, Grid, GridItem, Image, Text, Center, HStack, Icon, Spacer } from "@chakra-ui/react";
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
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const HomePage = () =>{

  return(
    <>
    <Container   h='100vh' maxW={'1400px'} minW={"1500px"}  minHeight={'800px'} paddingInlineEnd={'0'} paddingInlineStart={'0'}>
      
        <Grid  h={'100%'}
         gridTemplateColumns={'1fr 1fr 1fr 1fr'} gridTemplateRows={'400px 1fr 50px'}
         templateAreas={`"logo nav nav nav"
                        "main1 main1 main2 main2"
                        "footer footer footer footer"`}>
          <GridItem  area={'nav'}>
              <Flex w='100%' h={'100%'}  paddingTop={'120px'} >
                <Stack direction={'row'} spacing={'50px'}  paddingStart={'200px'}> 
                  <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
                    Home
                  </Button>
                  <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
                    Sign-up
                  </Button>
                  <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
                    Log-in
                  </Button>
                  <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
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
              <Stack direction={"column"} spacing={'50px'}>
                <Box >
                  <Text  fontFamily='ZCOOL XiaoWei' fontWeight='bold' paddingStart={'120px'} paddingEnd={'40px'} align={'center'} fontSize={'5xl'}>
                    Create Your Own Plant Monitoring System
                  </Text>
                </Box>
                <Center>
                  <Button size='lg' colorScheme='blue' w='200px' justifyContent={'center'}>
                    Sign Up
                  </Button>
                </Center>
                
              </Stack>
            </GridItem>
            <GridItem area={'main2'}>
              <Box boxShadow={'2xl'} rounded={'2xl'} overflow={'hidden'}>
                <Image  objectFit={'cover'} src='../../landing-page.jpg' alt='landing page image' />
              </Box>
            </GridItem>
            <GridItem area={'footer'} >
              <HStack>
                <Text paddingStart={'20px'}>
                © 2024 Pi Grow Inc. All rights reserved.
                </Text>
                <Spacer />
                <Icon as={FaGithub} boxSize={8} />
                <Icon as={FaTwitter} boxSize={8} />
                <Icon as={FaFacebook} boxSize={8} />
              </HStack>
              
            </GridItem>
        </Grid>
      
    </Container>
    </>
  );
};


export default HomePage