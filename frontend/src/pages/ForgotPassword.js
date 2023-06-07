import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  SlideFade,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { auth } from './auth';
import { useLocation } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth"
import Navbar from "../components/Navbar";

function ForgotPassword(props) {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [resetPasswordStatus, setResetPasswordStatus] = useState(null);

  useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const emailParam = searchParams.get('email');
      if (emailParam) {
        setEmail(emailParam);
      }
    }, []);

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetPasswordStatus('Password reset email sent. Please check your inbox.');
      })
      .catch((error) => {
        setResetPasswordStatus(error.message);
      });
  };

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
          <Heading as="h1" size="xl">
            Forgot Password
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
                <form onSubmit={resetPassword}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} bg="gray.100" id="email" type="email" />
                  <Button type="submit" mt="50px" width="100%">
                    Send Password Reset Email
                  </Button>
                  {resetPasswordStatus && (
                    <Box mt="2" color={resetPasswordStatus.includes('Error') ? 'red.500' : 'green.500'}>
                      {resetPasswordStatus}
                    </Box>
                  )}
                </form>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </SlideFade>
    </Box>
  );
}

export default ForgotPassword;
