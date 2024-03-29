import express from 'express'
import cors from 'cors'
import { collection, doc, query, setDoc, addDoc, getFirestore, getDocs, getDoc } from "firebase/firestore"; 
import { firebaseApp, firebaseConfig } from './firebase.js';
import bodyParser from 'body-parser';
import "firebase/auth"

const app = express();
const db = getFirestore(firebaseApp);
const port = process.env.PORT || 4000;
app.use(express.json());

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  res.status(201).send("ur mom");
})
app.use(cors())

app.post('/add_rating', async (req, res) => {
  const ridesDocRef = doc(db, "rides", req.body.rideId);
  const ridesDoc = await getDoc(ridesDocRef);

  let rides = ridesDoc.data();
  rides['rating'] = req.body.rating;
  const userRef = rides.driverID;
  const docSnap = await getDoc(userRef);

  // console.log(userRef.id)

  if (!docSnap.exists()) 
    res.status(400).send("No such user");

  let user = docSnap.data();
  // console.log(user)
  const prevRatingCount = user['ratingCount'] ? user['ratingCount'] : 0;
  const prevRating= user['rating'] ? user['rating'] : 0;
  user['rating'] = (prevRating * prevRatingCount + parseInt(req.body.rating)) / (prevRatingCount+1);
  user['ratingCount'] = prevRatingCount+1;

  await setDoc(userRef, user);
  await setDoc(ridesDocRef, rides);

  res.status(200).send("success");
})

app.get('/get_rides', async (req, res) => {
  const q = query(collection(db, "rides"));
  const querySnapshot = await getDocs(q);

  let rides = [];
  querySnapshot.forEach((doc) => {
    rides.push({...doc.data(), id: doc.id});
  });
  res.send(rides.filter(ride => 
      (!req.query.from || ride.from == req.query.from) &&
      (!req.query.to || ride.to == req.query.to) &&
      (!req.query.allUpcoming
        ? new Date(ride.startTime).toLocaleDateString("en-US", {timeZone: 'UTC'}) === new Date(req.query.startTime).toLocaleDateString("en-US", {timeZone: 'UTC'})
        : new Date(ride.startTime) > new Date(req.query.startTime) 
      )
    ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
  )
})

app.get('/user/:id', async (req, res) => {
  const docRef = doc(db, "users", req.params.id);
  const docSnap = await getDoc(docRef);

  let user = docSnap.data();

  let rides = [];
  if(user && user.rides)
  {
    for(const ride of user.rides)
    {
      // console.log(ride.rideId)
      const rideRef = doc(db, "rides", ride.rideId);
      const rideSnap = await(getDoc(rideRef));
      // console.log(rideSnap.data());
      rides.push(rideSnap.data());
    }
  }

  // console.log(rides)
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    res.status(200).send(JSON.stringify({...docSnap.data(), rides}));
  } else {
    // docSnap.data() will be undefined in this case
    // console.log("No such document!");
    res.status(400).send("No such page");
  }
})

app.post('/ride_signup', async (req, res) => {
  try {
    const { rideId, userId } = req.body;
    const ridesRef = doc(db, 'rides', rideId);
    const usersRef = doc(db, 'users', userId);

    const ride = await getDoc(ridesRef);
    const user = await getDoc(usersRef);

    let rideData = ride.data();
    let userData = user.data();

    if(rideData.capacity == rideData['passengers'].length)
    {
      res.status(400).send("Passenger capacity reached");
    }
    else if(rideData.passengers.map(passenger => passenger.userId).includes(userId))
    {
      res.status(400).send("You can't sign up for a ride twice");
    }
    else
    {
      rideData['passengers'].push({...userData, userId})
      const newRide = {rideId};
      if(userData['rides']) 
        userData['rides'].push(newRide);
      else 
        userData['rides'] = [newRide];

      await setDoc(ridesRef, rideData);
      await setDoc(usersRef, userData);
      res.status(201).send("success");
    }

  } catch (e) {
    // console.error("Error adding document: ", e);

    res.status(400).send("Bad Request");
    console.error(e);
  }
})

// Executes when we get a get request to / url
app.post('/create_user', async (req, res) => {
  try {
    // console.log("CREATE_USER", req.body);
    const { firstName, lastName, email, phoneNumber, uid } = req.body;
    // console.log(uid)
    await setDoc(doc(db, "users", uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      rides: []  // Initialize empty rides array
    }, { merge: true });
    res.status(201).send("TEST");
    // console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.log(e)
    res.status(400).send("Bad Request");
  }
})

app.post('/modify_user', async (req, res) => {
  console.log("Modifying user");
  try {
    const { firstName, lastName, email, phoneNumber, uid } = req.body;
    // console.log(uid)
    await setDoc(doc(db, "users", uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    }, { merge: true });
    res.status(201).send("TEST");
  } catch (e) {
    console.log(e)
    res.status(400).send("Bad Request");
  }
})

app.post("/create_ride", async (req, res) => {
  try {
    // console.log(req.body)
    const driverReference = doc(db, "users", req.body.driverID);
    // const fromReference = doc(db, "locations", req.body.from);
    // const toReference = doc(db, "locations", req.body.to);

    const driver = await getDoc(driverReference);
    // if(driver.exists())
    // {
    //   console.log("Document Data: ", driver.data());
    // } else{
    //   console.log("DRIVER NOT FOUND");
    // }
    // Ensure capacity was an int
    let capacityInt = parseInt(req.body.capacity);
    if (isNaN(capacityInt)) {
      console.log("Error: Capacity was not an int", req.body.capacity);
      res.send({ status: "error" });
      return
    }
    if (req.body.from === req.body.to) {
      console.log("Error: From and To location are the same", req.body.capacity);
      res.send({ status: "error" });
      return
    }
    const docRef = await addDoc(collection(db, "rides"), {
      from: req.body.from,
      to: req.body.to,
      driverID: driverReference,
      driverFirstName: driver.data().firstName,
      driverLastName: driver.data().lastName,
      passengers: [{...driver.data(), userId: req.body.driverID}],  // list of references
      startTime: req.body.datetime,
      capacity: capacityInt
    });
    console.log("Ride written with ID: ", docRef.id);
    await setDoc(docRef, {id: docRef.id}, {merge: true});
    // Add ride to the user's rides list
    let driverData = driver.data();
    if(driverData["rides"]) 
      driverData["rides"].push({"rideId":docRef.id});
    else 
      driverData["rides"] = [{"rideId":docRef.id}];
    
    // console.log("NEW DRIVER DATA", driverData);
    await setDoc(driverReference, driverData);

    res.send(JSON.stringify({"status":"success"}));
  } catch (e) {
    console.error("Error adding document: ", e);
    res.send({ status: "error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
