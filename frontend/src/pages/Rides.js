import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    ListItem,
    SimpleGrid,
    Spacer,
    Text,
    UnorderedList,
    VStack,
} from "@chakra-ui/react";
function RideCard(props) {
    /* props will have:
     * a driver,
     * a time,
     * a list of names that are part of the carpool group,
     * a carpool capacity (will fill any vacancies with "empty")
     */
    console.log(props);
    let emptyList = Array(props.capacity - props.names.length).fill("Empty");
    const peopleList = [...props.names, ...emptyList].map((name, index) => {
        return (
            <ListItem key={index} paddingLeft="15px">
                <Text fontSize="2xl">{name}</Text>
            </ListItem>
        );
    });
    return (
        <Card padding="30px">
            <CardHeader>
                <Avatar name={props.driver} />
            </CardHeader>
            <CardBody>
                <VStack spacing={4} align="left">
                    <Heading size="xl">{props.time}</Heading>
                    <UnorderedList
                        paddingLeft="25px"
                        height="175px"
                        overflow="hidden"
                    >
                        {peopleList}
                    </UnorderedList>
                    <Text as="b" fontSize="2xl">
                        {props.capacity -
                            props.names.length +
                            "/" +
                            props.capacity +
                            " Spots Available"}
                    </Text>
                </VStack>
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
}
function Rides() {
    return (
        <Box padding="40px">
            <Flex align="center">
                <Heading as="h1" size="4xl">
                    Rides
                </Heading>
                <Spacer />
                <Button margin="0px 35px" width="33%" height="50px">
                    <Text fontSize="xl"> Create a new ride</Text>
                </Button>
            </Flex>
            <Heading as="h2" size="xl" margin="20px 0px">
                {"LAX -> UCLA on June 15, 2029"}
            </Heading>
            <SimpleGrid
                columns={2}
                spacingX="40px"
                spacingY="20px"
                margin="30px 35px"
            >
                <RideCard
                    driver="Joe Biden"
                    time="9:00"
                    capacity={14}
                    names={[
                        "Joe Biden",
                        "Barack Obama",
                        "Donald Trump",
                        "Drake",
                    ]}
                />
                <RideCard
                    time="9:00"
                    capacity={4}
                    names={["Joe Mama", "Hugh Janis"]}
                />
                <RideCard
                    time="9:00"
                    capacity={4}
                    names={["Joe Mama", "Hugh Janis"]}
                />
                <RideCard
                    time="9:00"
                    capacity={4}
                    names={["Joe Mama", "Hugh Janis"]}
                />
            </SimpleGrid>
        </Box>
    );
}

export default Rides;
