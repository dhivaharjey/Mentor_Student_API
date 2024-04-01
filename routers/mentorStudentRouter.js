import express from "express";
import {
  allStudentsForOneMentor,
  assignStudentToMentor,
  changeMentorForStudent,
  createMentor,
  createStudent,
  previousMentor,
} from "../controllers/mentorStudentController.js";

const router = express.Router();

router.post("/create_mentor", createMentor);
router.post("/create_student", createStudent);
router.put("/mentors/:mentorId/add-students", assignStudentToMentor);
router.put("/students/:studentId/assign-mentor", changeMentorForStudent);
router.get("/mentors/:mentorId/all-students", allStudentsForOneMentor);
router.get("/students/:studentId/previous-mentor", previousMentor);
export default router;
