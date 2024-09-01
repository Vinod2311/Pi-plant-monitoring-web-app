import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  Input,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Realm from "realm-web";
import * as Yup from "yup";
import Footer from "../components/footer";
import Logo from "../components/logo";
import NavEntry from "../components/navEntry";
import { useEffect } from "react";

const LoginPage = () => {

  //Handle navigation
  const navigate = useNavigate();
  const handleRedirect = (pageURL) => {
    navigate(pageURL);
  };

  //If user is logged in go to dashboard
  useEffect(()=>{
    if ("userMongo" in sessionStorage){
      navigate('/dashboard')
    }
  },[navigate])
  

  

  //Public API config
  const firebaseConfig = {
    apiKey: "AIzaSyCHfnIcqTbOKuKtizPN4qUp6_AuwABENF8",
    authDomain: "raspberry-pi-plant-monitoring.firebaseapp.com",
    databaseURL:
      "https://raspberry-pi-plant-monitoring-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "raspberry-pi-plant-monitoring",
    storageBucket: "raspberry-pi-plant-monitoring.appspot.com",
    messagingSenderId: "656085848146",
    appId: "1:656085848146:web:d899dd1a52857536610f8b",
    measurementId: "G-XZ4ZSM1J4X",
  };

  //Create instance of FirebaseDB
  const appFirebase = initializeApp(firebaseConfig);
  const auth = getAuth(appFirebase);

  //Toast for error messages
  const toast = useToast();
  const toastIdRef = React.useRef();


  async function mongoSignInUser(email, password) {
  const appMongo = new Realm.App({
    id: "application-1-dkzsnxq",
  });
    const credentials = Realm.Credentials.emailPassword(email, password);
    const user = await appMongo.logIn(credentials);
    return user;
  }

  //login user to mongo and firebase
  async function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userFirebase = userCredential.user;
        sessionStorage.setItem("userFirebase", JSON.stringify(userFirebase));
        const userMongo = await mongoSignInUser(email, password);
        sessionStorage.setItem("userMongo", JSON.stringify(userMongo));
        
        handleRedirect("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toastIdRef.current = toast({
          title: "Error: " + errorCode,
          status: "error",
          isClosable: true,
        });
        console.log(errorCode);
        console.log(errorMessage);
      });
  }


  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  //Create formik instance to handle signin form
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      console.log(values);
      login(values.email, values.password);
    },
    validationSchema: LoginSchema,
  });

  return (
    <Container
      background={"#A0A5CB"}
      h="100vh"
      maxW={"1400px"}
      minW={"1500px"}
      minHeight={"800px"}
      paddingInlineEnd={"0"}
      paddingInlineStart={"0"}
    >
      <Grid
        h={"100%"}
        w={"100%"}
        gridTemplateColumns={"1fr 1fr 1fr 1fr"}
        gridTemplateRows={"300px 1fr 50px"}
        templateAreas={`"logo nav nav nav"
                        "main main main main"
                        "footer footer footer footer"`}
      >
        <GridItem area={"nav"}>
          <NavEntry />
        </GridItem>
        <GridItem area={"logo"}>
          <Logo />
        </GridItem>
        <GridItem area={"main"}>
          <form onSubmit={formik.handleSubmit}>
            <VStack h={"100%"}>
              <Text fontWeight={"bold"} fontSize={"5xl"}>
                Log In
              </Text>

              <VStack paddingTop={"30px"} spacing={"20px"}>
                <FormControl
                  isInvalid={formik.errors.email && formik.touched.email}
                >
                  <Input
                    value={formik.values.email}
                    background={"white"}
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    placeholder="Email"
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl
                  isInvalid={formik.errors.password && formik.touched.password}
                >
                  <Input
                    type="password"
                    value={formik.values.password}
                    bg={"white"}
                    name="password"
                    id="password"
                    onChange={formik.handleChange}
                    placeholder="Enter password"
                  />
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>

                <Button type="submit">Submit</Button>
              </VStack>
            </VStack>
          </form>
        </GridItem>
        <GridItem area={"footer"}>
          <Footer />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default LoginPage;
