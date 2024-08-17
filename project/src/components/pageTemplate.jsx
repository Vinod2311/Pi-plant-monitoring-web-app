import { Container } from "@chakra-ui/react"
import { Children } from "react"


const PageTemplate = (children) => {
  return(
    <Container   h='100vh' maxW={'1400px'} minW={"1500px"}  minHeight={'800px'} paddingInlineEnd={'0'} paddingInlineStart={'0'}>
        {children}
    </Container>
  )
}

export default PageTemplate 