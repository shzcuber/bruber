import { Button, Input, Box, Card, CardHeader, CardBody, Heading, 
    Stack, StackDivider, Flex, Alert, AlertIcon, NumberInput, 
    NumberInputField, NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper, FormControl, FormLabel }
    from "@chakra-ui/react";

import { useState } from 'react';


function CreateRide() {
  const [submitted, setSubmitted] = useState(false);

  function displayAlert(status) {
    console.log(status);
    return (
      <Box>
        <Alert status={status}>
          <AlertIcon />
          Ride successfully created!
        </Alert>
      </Box>
    );
  }
  if (submitted !== false) { // REMOVE !
    // else if error status="error"
  }
  return (
    <Box>
      {
      submitted ? displayAlert(submitted) : <Box></Box>
      }
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card size="lg" borderRadius="20px">
        <CardHeader>
          <Heading size='md'>Create a New Ride</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <FormControl isRequired>
              <Box>
                <FormLabel size='xs' textTransform='uppercase'>
                  From:
                </FormLabel>
                <Input placeholder="City" size="sm" />
              </Box>
              <Box>
                <FormLabel size='xs' textTransform='uppercase'>
                  To:
                </FormLabel>
                <Input placeholder="City" size="sm" />
              </Box>
              <Box>
                <FormLabel size='xs' textTransform='uppercase'>
                  Capacity
                </FormLabel>
                <NumberInput defaultValue={1} min={1} size="sm">
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
              <Box>
                <FormLabel size='xs' marginBottom="2" textTransform='uppercase'>
                  Leave Time:
                </FormLabel>
                <Flex>
                  <Input type="datetime-local" size="sm" />
                  <Button type="submit" size="s" fontSize='sm' padding="2"
                  marginLeft="2"
                  onClick={ handleButtonClick }>
                    Submit
                  </Button>
                </Flex>
              </Box>
            </FormControl>
          </Stack>
        </CardBody>
      </Card>
      </Box>
    </Box>
  );



}
export default CreateRide;
