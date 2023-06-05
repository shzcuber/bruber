import express from 'express'
import cors from 'cors'
import { collection, doc, query, setDoc, addDoc, getFirestore, getDocs, getDoc } from "firebase/firestore"; 
import { firebaseApp, firebaseConfig } from './firebase.js';
import bodyParser from 'body-parser';

const app = express();
const db = getFirestore(firebaseApp);
const port = 3000
app.use(express.json())

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  res.status(201).send("ur mom");
})
app.use(cors())

app.get('/get_rides', async (req, res) => {
  const q = query(collection(db, "rides"));
  const querySnapshot = await getDocs(q);

  let rides = [];
  querySnapshot.forEach((doc) => {
    rides.push({...doc.data(), id: doc.id});
  });
  res.send(rides)
})

app.get('/user/:id', async (req, res) => {
  const docRef = doc(db, "users", req.params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    res.status(200).send(JSON.stringify(docSnap.data()));
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    res.status(400).send("No such page");
  }
})

app.post('/ride_signup', async (req, res) => {
  try {
    const { rideId, userId } = req.body;
    const ridesRef = doc(db, 'rides', rideId)

    const ride = await getDoc(ridesRef);
    let rideData = ride.data();

    if(rideData.capacity == rideData['passengers'].length)
    {
      res.status(400).send("Passenger capacity reached")
    }
    else
    {
      rideData['passengers'].push(userId)
      await setDoc(ridesRef, rideData)
      res.status(201).send("success");
    }

  } catch (e) {
    // console.error("Error adding document: ", e);
    res.status(400).send("Bad Request");
    console.error(e)
  }
})

// Executes when we get a get request to / url
app.post('/create_user', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const docRef = await addDoc(collection(db, "users"), {
      firstName: firstName,
      lastName: lastName,
      email: email
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    // console.error("Error adding document: ", e);
    res.status(400).send("Bad Request");
  }
  res.status(201).send("TEST");
})

app.post("/create_ride", async (req, res) => {
  // fetch
  try {
    // console.log("res ", res.json())
    console.log(req.body)
    const driverReference = doc(db, "users", req.body.driverID);
    // const fromReference = doc(db, "locations", req.body.from);
    // const toReference = doc(db, "locations", req.body.to);

    const driver = await getDoc(driverReference);
    if(driver.exists())
    {
      console.log("Document Data: ", driver.data())
    } else{
      console.log("")
    }
    
    const docRef = await addDoc(collection(db, "rides"), {
      // rideId: 1,  // May delete?
      from: req.body.from,  // reference to location
      to: req.body.to,
      driverID: driverReference,
      driverFirstName: driver.data().first,
      driverLastName: driver.data().last,
      passengers: [],  // list of references
      startTime: req.body.datetime,
      capacity: req.body.capacity
    });
    console.log("Ride written with ID: ", docRef.id);
    res.send(JSON.stringify({"status":"success"}));
  } catch (e) {
    console.error("Error adding document: ", e);
    res.send({ status: "error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
