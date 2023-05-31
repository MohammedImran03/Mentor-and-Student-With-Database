import { client } from "../index.js";
import { ObjectId } from "mongodb";
//to get all Students data
export async function getallstudents() {
  return await client
    .db("Mentor-student-assign")
    .collection("student")
    .find({})
    .toArray();
}

//Get stuedent by id
export async function getstudentsbyID(id) {
  var oid = new ObjectId(id);
  return await client
    .db("Mentor-student-assign")
    .collection("student")
    .find({ _id: oid })
    .toArray();
}

//Delete Student details With Id
export async function Deletestudentid(id) {
  return await client
    .db("Mentor-student-assign")
    .collection("student")
    .deleteOne({ _id: new ObjectId(id) });
}

//Add New Student to Data
export async function addnewstudent(newstudentdata) {
  return await client
    .db("Mentor-student-assign")
    .collection("student")
    .insertOne(newstudentdata);
}

//Assign Mentor to Students
export async function assignmentor(_id, menterid) {
  var oid = new ObjectId(_id);
  var mentoroid = new ObjectId(menterid);
  var studentdatachange = await client
    .db("Mentor-student-assign")
    .collection("student")
    .updateOne(
      { _id: oid },
      { $set: { menterid: mentoroid, mentorassign: true } }
    );
  var mentordatachange = await client
    .db("Mentor-student-assign")
    .collection("mentor")
    .updateMany(
      { _id: mentoroid },
      { $set: { studentassigned: true }, $push: { studentsid: oid } }
    );
  return studentdatachange, mentordatachange;
}
//Edit Student data with Id
export async function editstudentid(_id, data) {
  var oid = new ObjectId(_id);
  return await client
    .db("Mentor-student-assign")
    .collection("student")
    .updateOne({ _id: oid }, { $set: data });
}
//Students Assigned to Mentors
export async function getassignedstudents() {
  return await client
    .db("Mentor-student-assign")
    .collection("student")
    .find({mentorassign: true})
    .toArray();
}