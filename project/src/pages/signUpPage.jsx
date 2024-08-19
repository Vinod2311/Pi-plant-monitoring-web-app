import { Button, Center, Container, FormControl, FormErrorMessage, Grid, GridItem, HStack, Input, InputGroup, InputRightElement, Show, Text, VStack } from "@chakra-ui/react"
import Nav from "../components/nav"
import Logo from "../components/logo"
import Footer from "../components/footer"
import React from "react";
import * as Realm from "realm-web";
import { useState } from "react"
import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword} from "firebase/auth";
import { Formik, Form, Field, useFormik,} from 'formik';
import * as Yup from 'yup';



const SignUpPage = () => {

  
  const appMongo= new Realm.App({
    id:"application-1-dkzsnxq"
  })

  const firebaseConfig = {
    apiKey: "AIzaSyCHfnIcqTbOKuKtizPN4qUp6_AuwABENF8",
    authDomain: "raspberry-pi-plant-monitoring.firebaseapp.com",
    databaseURL: "https://raspberry-pi-plant-monitoring-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "raspberry-pi-plant-monitoring",
    storageBucket: "raspberry-pi-plant-monitoring.appspot.com",
    messagingSenderId: "656085848146",
    appId: "1:656085848146:web:d899dd1a52857536610f8b",
    measurementId: "G-XZ4ZSM1J4X"
  };

  const appFirebase = initializeApp(firebaseConfig);

  const auth = getAuth(appFirebase);

  async function signUp(email,password) {
    var emailAlreadyInUse = false
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const userFirebase = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode)
      console.log(errorMessage)
      if (errorCode ==  "auth/email-already-in-use"){
        return
      }
    });

  }

  const SignupSchema = Yup.object().shape({
    fName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  });

  const formik = useFormik({
    initialValues: {fName:'',lName:'',email:'',password:''},
    onSubmit: (values) => {
      console.log(values)
      signUp(values.email,values.password)},
    validationSchema: SignupSchema
  })

  //const [error, setError] = useState(false)
  //var [email,setEmail] =useState('')
  //var [password,setPassword] =useState('')
  //var [fName,setFName] =useState('')
  //var [lName,setLName] =useState('')

  
  /*
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(fName,lName,email,password)
    signUp(email,password)
  }*/


  //validate
  //onst validate = (value) => {
  //  let console.error
 //   (if (!value))
    
 // }

  //add user


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
          <VStack>
            <form onSubmit={formik.handleSubmit}> 
              
              
                <Center>
                  <Text fontWeight={'bold'} fontSize={'5xl'} >
                    Sign Up
                  </Text>
                </Center>

                
                    <HStack paddingTop={'20px'} spacing={'20px'}>
                      
                        
                          <FormControl isInvalid={formik.errors.fName && formik.touched.fName}>
                            <Input name="fName" placeholder="First Name" bg={'white'} onChange={formik.handleChange}/>
                            <FormErrorMessage>{formik.errors.fName}</FormErrorMessage>
                          </FormControl>
                        
                      
                      
                        
                          <FormControl isInvalid={formik.errors.lName && formik.touched.lName}>
                            <Input name="lName" placeholder="Last Name" bg={'white'} onChange={formik.handleChange}/>
                            <FormErrorMessage>{formik.errors.lName}</FormErrorMessage>
                          </FormControl>
                        
                        
                    </HStack>
                    <VStack paddingTop={'20px'} spacing={'20px'} >
                      
                        
                          <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                            <Input name="email" placeholder="Email" bg={'white'} type="email" onChange={formik.handleChange}/>
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                          </FormControl>
                        
                        
                        
                          
                          <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                            <Input name="password" placeholder="Password" bg={'white'} type="password" onChange={formik.handleChange}/>
                            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                          </FormControl>
                        
                        
                    </VStack>
                    <Center>
                      <Button marginTop={'20px'} size={'lg'} bg={'#80D3F8'} _hover={{ bg: '#3CBBF3' }}  type="submit">
                        Sign Up
                      </Button>
                    </Center>
                  
              
            </form>
          </VStack>
        </GridItem>
        <GridItem area={'footer'} >
          <Footer />
        </GridItem>
    </Grid>
      
    </Container>
  )
}

export default SignUpPage