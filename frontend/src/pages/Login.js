import {
  Box,
  Button,
  Checkbox,
  Container,
  Heading,
  FormLabel,
  HStack,
  Input,
  Stack,
  SlideFade,
} from '@chakra-ui/react'
import { useState } from 'react'
import { auth, userSignOut } from "./auth"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  getAdditionalUserInfo,
} from "firebase/auth"
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";


function setupUser(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({
      'uid': user.uid,
      'firstName': null,
      'lastName': null,
      'email': user.email,
      'phoneNumber': null
    })
  };

  fetch(`${process.env.REACT_APP_BACKEND}/create_user`, requestOptions)
    .then(data => {
      console.log(process.env.REACT_APP_BACKEND)
    })
    .catch(error => {
        console.log("Error: " + error);
    })
}

function popUp() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider).then((result) => {
    if (getAdditionalUserInfo(result).isNewUser) {
      setupUser(result.user)
    }
  }).catch((error) => {
    alert(error);
  })
}

function LoginPage(props) {
  console.log(process.env.REACT_APP_BACKEND)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        if (userCred.user.emailVerified) {
          localStorage.setItem("user", userCred);
          console.log(userCred);
        } else {
          userSignOut();
          alert("Please verify your email before logging in.");

        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              setupUser(userCredential.user)
              sendEmailVerification(userCredential.user)
                .then(() => {
                  userSignOut();
                  alert("Email verification sent. Please verify your email.");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert(error);
        }
      });
  }

  const transitionProp = {
    enter: { duration: 0.4 },
    exit: { duration: 0 },
  };

  return (
    <Box color="primary.700">
      <Navbar authUser={props.authUser}/>
      <SlideFade
          in={true}
          direction="down"
          offsetY="20px"
          unmountOnExit={true}
          transition={transitionProp}
      >
        <Container maxW="lg" p="5%">
          <Heading as="h1" size="2xl">
            Login
          </Heading>
          <Box
            backgroundColor="white"
            borderRadius="xl"
            my="5%"
            padding="20px"
            boxShadow="md"
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <form onSubmit={signIn}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input value={email} onChange={(e) => { setEmail(e.target.value) }} bg="gray.100" id="email" type="email" />
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input value={password} onChange={(e) => { setPassword(e.target.value) }} bg="gray.100" id="password" type="password" />
                  <HStack my="3" justify="space-between">
                    <Checkbox defaultChecked>Remember me</Checkbox>
                    <Link to={`/forgot-password?email=${encodeURIComponent(email)}`}>
                      <Button variant="link" colorScheme="blue" size="sm">
                        Forgot password?
                      </Button>
                    </Link>
                  </HStack>
                  <Stack spacing="6" align="center">
                    <Button type='submit' width="100%">Sign In / Create Account</Button>
                    <Button onClick={popUp} width="100%" variant="outline"> Login with Google </Button>

                  </Stack>
                </form>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </SlideFade>
    </Box>
  )
}

export default LoginPage;
