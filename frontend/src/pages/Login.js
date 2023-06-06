import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Stack,
  } from '@chakra-ui/react'
import { useState } from 'react'
import {auth} from "./auth"
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"


function popUp(){
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then(() => {}).catch((error) => {
    alert(error);
  })
}

function LoginPage(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCred) => {
      localStorage.setItem("user", userCred);
      console.log(userCred)
    }).catch((error) => {
      if(error){
        createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
        }).catch((error) => {
          alert(error)
        })
      }
    })
  }

  return(<Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
  <Box
    py={{ base: '0', sm: '8' }}
    px={{ base: '4', sm: '10' }}
    bg={{ base: 'transparent', sm: 'bg-surface' }}
    boxShadow={{ base: 'none', sm: 'md' }}
    borderRadius={{ base: 'none', sm: 'xl' }}
    backgroundColor="white"
  >
    <Stack spacing="6">
      <Stack spacing="5">
        <form onSubmit={signIn}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} bg="gray.100" id="email" type="email" />
        <FormLabel htmlFor="password">Password</FormLabel>
          <Input value={password} onChange={(e)=>{setPassword(e.target.value)}} bg="gray.100" id="password" type="password" />
        <HStack my="3" justify="space-between">
        <Checkbox defaultChecked>Remember me</Checkbox>
        <Button variant="link" colorScheme="blue" size="sm">
          Forgot password?
        </Button>
      </HStack>
      <Stack spacing="6" align="center">
        <Button type='submit'  width="100%">Sign in / Create Account</Button>
        <Button onClick={popUp} width="100%" variant="outline"> Login with google </Button>
        
      </Stack>
        </form>
      </Stack>
      
      
    </Stack>
  </Box>
</Container>)
  
}
    


export default LoginPage;