import { Button, Input, Box, Card, CardHeader, CardBody, Heading, 
    Stack, StackDivider, Flex, Alert, AlertIcon, NumberInput, 
    NumberInputField, NumberInputStepper, NumberIncrementStepper,
    NumberDecrementStepper, FormControl, FormLabel }
    from "@chakra-ui/react";

import { useState } from 'react';
import { useForm } from 'react-hook-form'


function CreateRide() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function onSubmit(formData) {
    console.log("handleButtonClick() called in CreateRide.js");
    // CHANGE LATER ONCE WE HAVE AUTH
    formData["driverID"] = "05l2b4OVVOM97RT5ZaDt"
    console.log(formData)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(formData)
      // body: JSON.stringify({ title: "React POST Request Example" })
    };

    fetch("http://localhost:3000/create_ride", requestOptions)
    .then(res => res.json())  // Convert json to js object
    .then(data => {
      // console.log("Data received: " + data.status);
      if (data.status === "success") {
        // Display success msg (change state)
        setSubmitted("success");
        console.log("setSubmitted: ", submitted);
      }
    })
    .catch(error => {
      console.log("Error: " + error);
      setSubmitted("error");
    })
  }

  function displayAlert(status) {
    console.log("status", status);
    return (
      <Box>
        <Alert status={status}>
          <AlertIcon />
          Ride successfully created!
        </Alert>
      </Box>
    );
  }
  // if (submitted !== false) {  // REMOVE !
  //   // else if error status="error"
  // }
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
                <Input placeholder="City" size="sm" name="from" {...register("from", {required: true})} />
              </Box>
              <Box>
                <FormLabel size='xs' textTransform='uppercase' >
                  To:
                </FormLabel>
                <Input placeholder="City" size="sm" name="to" {...register("to", {required: true})} />
              </Box>
              <Box>
                <FormLabel size='xs' textTransform='uppercase'>
                  Capacity
                </FormLabel>
                <NumberInput defaultValue={1} min={1} size="sm" name="capacity" type="number"
                    {...register("capacity", {required: true})} 
                    >
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
                  <Input type="datetime-local" size="sm" name="datetime" {...register("datetime", {required: true})} />
                  <Button type="submit" size="s" fontSize='sm' padding="2"
                  marginLeft="2"
                  onClick={ handleSubmit(onSubmit) }>
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
