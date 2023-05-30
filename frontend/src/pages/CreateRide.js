import { Button, Input, Box, Card, CardHeader, CardBody, Heading, 
    Stack, StackDivider, Flex } from "@chakra-ui/react";

function CreateRide() {
  return (
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
              <Input type="number" placeholder="Capacity" size="sm" />
            </Box>
            <Box>
              <Heading size='xs' marginBottom="2" textTransform='uppercase'>
                Leave Time:
              </Heading>
              <Flex>
                <Input type="datetime-local" size="sm" />
                <Button type="submit" size="s" fontSize='sm' padding="2" marginLeft="2">
                  Submit
                </Button>
              </Flex>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
}
export default CreateRide;
