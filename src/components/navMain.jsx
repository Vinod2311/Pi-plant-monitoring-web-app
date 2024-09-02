
import { Button, Flex, Stack } from "@chakra-ui/react";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as Realm from "realm-web";

const NavMain = () => {

  //Handle navigation via menu
  const navigate = useNavigate()
  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  }

  //Handle logout - clear cookies and Databases connection
  const handleLogout = () => {
    try {
      sessionStorage.clear()
    }catch(err){
      console.log(err)
    }
    try {
      const appRealm = Realm.App.getApp("application-1-dkzsnxq");
      appRealm.currentUser.logOut()
    }catch(err){
      console.log(err)
    }
    try {
      const firebaseApp = getApp()
      getAuth(firebaseApp).signOut()
    } catch (err){
      console.log(err)
    }
    navigate('/')
  }

  

  
  return(
    <Flex w='100%' h={'100%'}  paddingTop={'120px'} >
        <Stack direction={'row'} spacing={'50px'}  paddingStart={'200px'}> 
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}} 
            onClick={() => handleMenuSelect('/dashboard')}>
            Dashboard
          </Button>
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}
          onClick={() => handleMenuSelect('/registerPi')}>
            Register Pi
          </Button>
          <Button size={'lg'} bg={'#80D3F8'} _hover={{bg:'#3CBBF3'}}
          onClick={() => handleLogout()}>
            Log-out
          </Button>
        </Stack>
      </Flex>
  )
}

export default NavMain