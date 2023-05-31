import express from "express";
import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";
import {Studentrouter} from './Router/Student.js';
import {Mentorrouter} from './Router/Mentor.js';
import cors from 'cors';
dotenv.config();
const app = express();


const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;


//mongodb connection
async function Mongodbconnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MONGO DB CONNECTED SUCCESSFULLY");
  return client;
}
 export const client = await Mongodbconnection();

 //In-built middleware
app.use(express.json());
app.use(cors());


//Rest API Endpoints
app.get("/", function (req, res) {
  res.send("Hi 🙋‍♂️ Welcome to my Server🙏 This server is about Mentor-Student assigning");
});
app.use("/students", Studentrouter);
app.use("/mentors", Mentorrouter);
//Port Connection
app.listen(PORT, () => console.log(`Server Started at ${PORT} 🎉`));