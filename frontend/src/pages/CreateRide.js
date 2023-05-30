import { Button, Input, Box, Card, CardHeader, CardBody, Heading, 
    Stack, StackDivider, Flex, Alert, AlertIcon, NumberInput, 
    NumberInputField, NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper } 
    from "@chakra-ui/react";

import { useState } from 'react';


function CreateRide() {
  return (
    <div>
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card size="lg" borderRadius="20px">
        <CardHeader>
          <Heading size='md'>Create a New Ride</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' marginBottom="2" textTransform='uppercase'>
                From:
              </Heading>
              <Input placeholder="City" size="sm" />
            </Box>
            <Box>
              <Heading size='xs' marginBottom="2" textTransform='uppercase'>
                To:
              </Heading>
              <Input placeholder="City" size="sm" />
            </Box>
            <Box>
              <Heading size='xs' marginBottom="2" textTransform='uppercase'>
                Capacity
              </Heading>
              <NumberInput defaultValue={1} min={1} size="sm">
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box>
              <Heading size='xs' marginBottom="2" textTransform='uppercase'>
                Leave Time:
              </Heading>
              <Flex>
                <Input type="datetime-local" size="sm" />
                <Button type="submit" size="s" fontSize='sm' padding="2" 
                marginLeft="2"
                onSubmit={ handleButtonClick }>
                  Submit
                </Button>
              </Flex>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  </div>
  );


}
export default CreateRide;
