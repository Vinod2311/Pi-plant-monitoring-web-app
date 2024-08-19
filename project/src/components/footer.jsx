/* eslint-disable no-unused-vars */
import { HStack, Icon, Spacer, Text } from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";



const Footer = () => {

  return(
      <HStack>
        <Text paddingStart={'20px'}>
        © 2024 Pi Grow Inc. All rights reserved.
        </Text>
        <Spacer />
        <Icon as={FaGithub} boxSize={8} />
        <Icon as={FaTwitter} boxSize={8} />
        <Icon as={FaFacebook} boxSize={8} />
      </HStack>
  )
}

export default Footer


  