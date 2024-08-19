import { Box, Button, Center, Container, FormControl, FormErrorMessage, Grid, GridItem, HStack, Image, Input, InputGroup, InputRightElement, Show, Text, VStack } from "@chakra-ui/react"
import Nav from "../components/nav"
import Logo from "../components/logo"
import Footer from "../components/footer"
import React from "react";



const AboutPage = () => {

  return(
    <Container   h='100vh' maxW={'1400px'} minW={"1500px"}  minHeight={'800px'} paddingInlineEnd={'0'} paddingInlineStart={'0'}>
        <Grid  h={'100%'}
         gridTemplateColumns={'1fr 1fr 1fr 1fr'} gridTemplateRows={'300px 1fr 50px'}
         templateAreas={`"logo nav nav nav"
                        "main1 main1 main2 main2"
                        "footer footer footer footer"`}>
        <GridItem  area={'nav'}>
          <Nav />
        </GridItem>
        <GridItem area={'logo'}>
          <Logo />
        </GridItem>
        <GridItem area={'main1'}>
          <VStack  paddingTop='100px' alignItems='start' spacing={'50px'}>
            <Box>
              <Text   fontWeight='bold' paddingStart={'10px'}  align={'left'} fontSize={'2xl'}>
                What is Pi Grow?
              </Text>
            </Box>
            <Box>
              <Text   fontWeight='semibold' paddingStart={'10px'}  fontSize={'md'}>
                What is Pi Grow?
              </Text>
            </Box>
          </VStack>
        </GridItem>
        <GridItem area={'main2'}>
        <Box boxShadow={'2xl'} rounded={'2xl'} overflow={'hidden'}>
            <Image  src='../../placeholder.png' alt='about page image' />
          </Box>
        
        </GridItem>
        <GridItem area={'footer'} >
          <Footer />
        </GridItem>
    </Grid>
      
    </Container>
  )
}

export default AboutPage