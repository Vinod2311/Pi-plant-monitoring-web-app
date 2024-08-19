import { Button, Card, Container, FormControl, FormErrorMessage, Grid, GridItem, HStack, Input, InputGroup, InputRightElement, Show, Text, VStack } from "@chakra-ui/react"

import Nav from "../components/nav"
import Logo from "../components/logo"
import Footer from "../components/footer"
import React from "react"
import { useFormik,  } from "formik"
import * as Yup from 'yup';

const LoginPage = () => {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  const formik = useFormik({
    initialValues: {email:'',password:''},
    onSubmit: (values) => console.log(values),
    validationSchema: SignupSchema
  })

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
          
          <form onSubmit={formik.handleSubmit}>
            <VStack h={'100%'}>
              <Text fontWeight={'bold'} fontSize={'5xl'}>
                Log In
              </Text>
              
              <VStack paddingTop={'30px'} spacing={'20px'}>

              

              <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                <Input value={formik.values.email} background={'white'} name="email" id="email" onChange={formik.handleChange} placeholder="Email"/>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                <Input value={formik.values.password} bg={'white'} name="password" id="password" onChange={formik.handleChange} placeholder='Enter password'/>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
                
                  <Button type="submit">
                    Submit
                  </Button>
                
              
              </VStack>
              
            </VStack>
          </form>
          
        </GridItem>
        <GridItem area={'footer'} >
          <Footer />
        </GridItem>
    </Grid>
      
    </Container>
  )
}

export default LoginPage