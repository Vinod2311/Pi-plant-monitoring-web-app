import {
  Box,
  Container,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Footer from "../components/footer";
import Logo from "../components/logo";
import Nav from "../components/navEntry";

const AboutPage = () => {
  return (
    <>
      <Container
        background={"#A0A5CB"}
        h={'100vh'}
        maxW={"1500px"}
        minW={"1300px"}
        minHeight={"1000px"}
        paddingInlineEnd={"0"}
        paddingInlineStart={"0"}
      >
        <Grid
          h={"100%"}
          w={"100%"}
          gridTemplateColumns={"1fr 1fr 1fr 1fr"}
          gridTemplateRows={"300px 1fr 50px"}
          templateAreas={`"logo nav nav nav"
                        "main1 main1 main2 main2"
                        "footer footer footer footer"`}
        >
          <GridItem area={"nav"}>
            <Nav />
          </GridItem>
          <GridItem area={"logo"}>
            <Logo />
          </GridItem>
          <GridItem area={"main1"}>
            <VStack paddingTop="100px" alignItems="start" spacing={"50px"}>
              <Box>
                <Text
                  fontWeight="bold"
                  paddingStart={"10px"}
                  align={"left"}
                  fontSize={"5xl"}
                >
                  What is Pi Grow?
                </Text>
              </Box>
              <Box>
                <Text
                  fontWeight="semibold"
                  paddingStart={"10px"}
                  fontSize={"2xl"}
                  paddingEnd={"80px"}
                >
                  Want to set up your very own plant monitoring system without
                  all the hassle? We've got you covered, simply create an
                  account, link your Raspberry Pi and we'll handle the rest.
                </Text>
              </Box>
            </VStack>
          </GridItem>
          <GridItem area={"main2"}>
            <Box marginBottom={'20px'} boxShadow={"2xl"}  rounded={"2xl"} overflow={"hidden"}>
              <Image
                boxSize="100%"
                src="../../placeholder.png"
                alt="about page image"
              />
            </Box>
          </GridItem>
          <GridItem  area={"footer"}>
            <Footer />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default AboutPage;
