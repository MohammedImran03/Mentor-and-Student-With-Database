import express from "express";
import {
  getallstudents,
  getstudentsbyID,
  Deletestudentid,
  addnewstudent,
  assignmentor,
  editstudentid,
  getassignedstudents
} from "../helper/Student.js";
const router = express.Router();

//to get all Students
router.get("/", async function (req, res) {
  const data = await getallstudents();
  res.send(data);
});
//Get Students Who are Assigned With Mentors
router.get("/students_assigned_to_mentor", async function (req, res) {
  const data = await getassignedstudents();
  res.send(data);
});

//to get  Students with id
router.get("/:id", async function (req, res) {
  const {id} = req.params;
  console.log(id);
  try {
    const response = await getstudentsbyID(id);
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
        message: "Student ID Fetched",
      });
    } else {
      return res.status(400).json({
        success: false,
        data: {},
        message: "No Student ID found!!!",
      });
    }
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error,
      message: "Internal server error!!!",
    });
  }
});

//delete Student with id
router.delete("/delete/:_id", async function (req, res) {
  const { _id } = req.params;
  console.log(_id);
  const response = await Deletestudentid(_id);
  res.send(response);
});

//Create New Student
router.post("/addstudent", async function(req,res){
  const newstudentdata = req.body;
  console.log(newstudentdata); 
  const result = await addnewstudent(newstudentdata);
  res.send(result);
});

//Edit Student id
router.put("/editstudent/:_id", async function(req,res){
  const {_id} = req.params;
  const data = req.body;
  const result = await editstudentid(_id, data);
  res.send(result);
});


//update Student with Mentor id
router.put("/assignmentor/:_id", async function(req,res){
  const {_id} = req.params;
  const menterid = req.body.menterid;
  const result = await assignmentor(_id, menterid);
  res.send(result);
});



export const Studentrouter = router;