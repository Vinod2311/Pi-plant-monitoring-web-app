import { Button, Container, Grid, GridItem, HStack, Input, InputGroup, InputRightElement, Show, Text, VStack } from "@chakra-ui/react"
import PageTemplate from "../components/pageTemplate"
import Nav from "../components/nav"
import Logo from "../components/logo"
import Footer from "../components/footer"
import React from "react"


const LoginPage = () => {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return(
    <Container   h='100vh' maxW={'1400px'} minW={"1500px"}  minHeight={'800px'} paddingInlineEnd={'0'} paddingInlineStart={'0'}>
        <Grid  h={'100%'}
         gridTemplateColumns={'1fr 1fr 1fr 1fr'} gridTemplateRows={'300px 1fr 50px'}
         templateAreas={`"logo nav nav nav"
                        "main main main main"
                        "footer footer footer footer"`}>
        <GridItem  area={'nav'}>
          <Nav />
        </GridItem>
        <GridItem area={'logo'}>
          <Logo />
        </GridItem>
        <GridItem area={'main'}>
          <VStack h={'100%'}>
            <Text fontWeight={'bold'} fontSize={'5xl'}>
              Log In
            </Text>
            
            <VStack paddingTop={'30px'}>
            <Input background={'white'} placeholder="Email"/>
            <InputGroup size='md'>
              
              <Input background={'white'}
                pr='4.5rem'
                type={Show ? 'text' : 'password'}
                placeholder='Enter password'
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                  {Show? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            </VStack>
            <Button  size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}>
              Log In
            </Button>
          </VStack>
        </GridItem>
        <GridItem area={'footer'} >
          <Footer />
        </GridItem>
    </Grid>
      
    </Container>
  )
}

export default LoginPage