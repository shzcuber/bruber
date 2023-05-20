import { Button, Input, Container, Box, Card, CardHeader, CardBody, Heading, 
    Text, Stack, StackDivider } from "@chakra-ui/react";

function CreateRide() {
    return (
        <Container>
            <Card>
                <CardHeader>
                    <Heading size='md'>Create a New Ride</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            From:
                            </Heading>
                            <Input placeholder="City" size="sm" />
                            <Button type="submit" fontSize='sm'>Submit</Button>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            To:
                            </Heading>
                            <Input placeholder="City" size="sm" />
                            <Button type="submit">Submit</Button>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                            Leave Time:
                            </Heading>
                            <Input type="datetime-local" size="sm" />
                            <Button type="submit">Submit</Button> 
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </Container>

    );
}
export default CreateRide;
