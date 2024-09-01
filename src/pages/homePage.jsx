import { Box, Button, Center, Container, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";
import '@fontsource/zcool-xiaowei';
import React from "react";
import Footer from "../components/footer";
import Logo from "../components/logo";
import NavEntry from "../components/navEntry";
import { useNavigate } from "react-router-dom";



const HomePage = () =>{
  console.log("Rendering home page")

  //Used for the navigation button
  const navigate = useNavigate()

  return(
    <>
    <Container  background={'#A0A5CB'} h='100vh' maxW={'1500px'} minW={"1300px"}  minHeight={'800px'} paddingInlineEnd={'0'} paddingInlineStart={'0'}>
        <Grid  h={'100%'} w={'100%'}
         gridTemplateColumns={'1fr 1fr 1fr 1fr'} gridTemplateRows={'400px 1fr 50px'}
         templateAreas={`"logo nav nav nav"
                        "main1 main1 main2 main2"
                        "footer footer footer footer"`}>
        <GridItem  area={'nav'}>
          <NavEntry />
        </GridItem>
        <GridItem area={'logo'}>
          <Logo />
        </GridItem>
        <GridItem area={'main1'}>
          <Stack direction={"column"} spacing={'50px'}>
            <Box >
              <Text  fontFamily='ZCOOL XiaoWei' fontWeight='bold' paddingStart={'120px'} paddingEnd={'40px'} align={'center'} fontSize={'5xl'}>
                Create Your Own Plant Monitoring System
              </Text>
            </Box>
            <Center>
              <Button size='lg' colorScheme='blue' w='200px' justifyContent={'center'} onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </Center>
            
          </Stack>
        </GridItem>
        <GridItem area={'main2'}>
          <Box boxShadow={'2xl'} rounded={'2xl'} overflow={'hidden'}>
            <Image  src='../../landing-page.jpg' alt='landing page image' />
          </Box>
        </GridItem>
        <GridItem area={'footer'} >
          <Footer />
        </GridItem>
    </Grid>
      
    </Container>
    </>
  );
};


export default HomePage