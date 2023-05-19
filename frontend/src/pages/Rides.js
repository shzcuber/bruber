import {
    SimpleGrid,
    VStack,
    Heading,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Text,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";
function RideCard(props) {
    //props will have a time, a list of names that are part of the carpool group, and a carpool capacity (will fill any vacancies with "empty")
    console.log(props);
    let emptyList = Array(props.capacity - props.names.length).fill("Empty");
    const peopleList = [...props.names, ...emptyList].map((name, index) => {
        return (
            <ListItem key={index}>
                <h3>{name}</h3>
            </ListItem>
        );
    });
    return (
        <Card>
            <CardHeader></CardHeader>
            <CardBody>
                <VStack spacing={4} align="left">
                    <Heading size="md">{props.time}</Heading>
                    <UnorderedList paddingLeft={15}>{peopleList}</UnorderedList>
                    <Text as="b">
                        {props.names.length +
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
        <div>
            <h1>Rides</h1>
            <h2>{"LAX -> UCLA on June 15, 2029"}</h2>
            <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px,1fr))"
            >
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
                <RideCard
                    time="9:00"
                    capacity={4}
                    names={["Joe Mama", "Hugh Janis"]}
                />
            </SimpleGrid>
        </div>
    );
}

export default Rides;
