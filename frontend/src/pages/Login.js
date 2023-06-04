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
  import { GoogleLogin } from '@react-oauth/google';

  
    const LoginPage = () => (
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
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input bg="gray.100" id="email" type="email" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input bg="gray.100" id="password" type="password" />
            </FormControl>

          </Stack>
          <HStack justify="space-between">
            <Checkbox defaultChecked>Remember me</Checkbox>
            <Button variant="link" colorScheme="blue" size="sm">
              Forgot password?
            </Button>
          </HStack>
          <Stack spacing="6" align="center">
            <Button width="100%">Sign in</Button>
            <Button width="100%" variant="outline"> Don't have an account? Sign up </Button>
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </Stack>
          
        </Stack>
      </Box>
    </Container>
  )

export default LoginPage;