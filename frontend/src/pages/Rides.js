function RideCard(props) {
    //props will have a time, a list of names that are part of the carpool group, and a carpool capacity (will fill any vacancies with "empty")
    console.log(props);
    let emptyList = Array(props.capacity).fill("Empty");
    const peopleList = [...props.names, ...emptyList].map((name, index) => {
        return (
            <li key={index}>
                <h3>{name}</h3>
            </li>
        );
    });
    return (
        <div>
            <h2>{props.time}</h2>
            <ol>{peopleList}</ol>
            <h3>
                {props.names.length + "/" + props.capacity + " Spots Available"}
            </h3>
        </div>
    );
}
function Rides() {
    return (
        <div>
            <h1>Rides</h1>
            <h2>{"LAX -> UCLA on June 15, 2029"}</h2>
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
        </div>
    );
}

export default Rides;
