import express from 'express';
import {getallmentors,getmentorbyID,Deletementorid,addnewmentor,assignstudent, editmentorid, getassignedmentors} from '../helper/Mentor.js';
const router = express.Router();

//to get all mentorrs
router.get("/", async function (req, res) {
    const data = await getallmentors();
    res.send(data);
  });
  //Get Students Who are Assigned With Mentors
router.get("/mentors_assigned_to_students", async function (req, res) {
  const data = await getassignedmentors();
  res.send(data);
});
  //to get mentorr with id
  router.get("/:id", async function (req, res) {
    const {id}=req.params;
    console.log(id);
    try {
      const response = await getmentorbyID(id);
      if (response) {
        return res.status(200).json({
          success: true,
          data: response,
          message: "mentorr ID Fetched",
        });
      } else {
        return res.status(400).json({
          success: false,
          data: {},
          message: "No mentor ID found!!!",
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

//delete mentor with id
router.delete("/delete/:_id", async function (req, res) {
  const { _id } = req.params;
  console.log(_id );
  const result = await Deletementorid(_id);
  res.send(result);
});

//Create New mentor
router.post("/addmentor", async function(req,res){
  const newmentordata = req.body;
  console.log(newmentordata); 
  const result = await addnewmentor(newmentordata);
  res.send(result);
});

//Edit Mentor with id
router.put("/editmentor/:_id", async function(req,res){
  const {_id} = req.params;
  const data = req.body;
  const result = await editmentorid(_id, data);
  res.send(result);
});

//Update Mentor with student ids
router.put("/assignstudent/:_id", async function(req,res){
  const {_id} = req.params;
  const studentsid = req.body.studentsid;
  const result = await assignstudent(_id, studentsid);
  res.send(result);
});


  export const Mentorrouter = router;