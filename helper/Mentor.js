import { client } from "../index.js";
import { ObjectId } from "bson";
import {getstudentsbyID} from "./Student.js";


//to get all Mentors data
export async function getallmentors() {
  return await client
    .db("Mentor-student-assign")
    .collection("mentor")
    .find({})
    .toArray();
}

//Get Mentors Who are Assigned to Students
export async function getassignedmentors() {
  return await client
    .db("Mentor-student-assign")
    .collection("mentor")
    .find({studentassigned: true})
    .toArray();
}

//Get Mentor by id
export async function getmentorbyID(id) {
  var oid = new ObjectId(id);
  return await client
    .db("Mentor-student-assign")
    .collection("mentor")
    .find({ _id: oid })
    .toArray();
}
//Delete Mentor by id
export async function Deletementorid(id) {
  return await client
    .db("Mentor-student-assign")
    .collection("mentor")
    .deleteOne({ _id: new ObjectId(id)});
}

//Add New Mentor 
export async function addnewmentor(newmentordata) {
  return await client
    .db("Mentor-student-assign")
    .collection("mentor")
    .insertOne(newmentordata);
}

//Assign Student to Mentor
export async function assignstudent(_id, studentsid) {
  var oid = new ObjectId(_id);
  var studentoid = new ObjectId(studentsid);
  var studentdetails=await getstudentsbyID(studentsid); 
  var studentdatachange = await client
  .db("Mentor-student-assign")
  .collection("student")
  .updateOne(
    { _id: studentoid },
    { $set: { menterid: oid, mentorassign: true } }
  );
  var mentordatachange = await client
  .db("Mentor-student-assign")
  .collection("mentor")
  .updateMany({ _id: oid }, { $set: { studentassigned: true } , $push:{studentsid:studentdetails}});
  return (studentdatachange,mentordatachange);
}

//Edit Mentor Details with ID
export async function editmentorid(_id, data) {
  var oid = new ObjectId(_id);
  return await client
  .db("Mentor-student-assign")
  .collection("mentor")
    .updateOne({ _id: oid }, { $set: data });
}

