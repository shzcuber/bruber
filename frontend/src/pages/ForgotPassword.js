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
import { useState, useEffect } from 'react'
import { auth } from './auth';
import { useLocation } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth"

function ForgotPassword() {
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

  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
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
  );
}

export default ForgotPassword;
