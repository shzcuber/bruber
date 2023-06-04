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
  if (submitted !== false) {  // REMOVE !
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


  function handleButtonClick() {
    console.log("handleButtonClick() called in CreateRide.js");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ title: "React POST Request Example" })
    };
    fetch("http://localhost:3000/create_ride", requestOptions)
    .then(res => res.json()) // Convert json to js object
    .then(data => {
      console.log("Data received: " + data.status);
      if (data === "Success")
        // Display success msg (chang state)

        setSubmitted("success");
        console.log(submitted);
    })
    .catch(error => console.log("Error: " + error))
  }
}
export default CreateRide;
