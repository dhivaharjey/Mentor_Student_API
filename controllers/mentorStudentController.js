import { Mentor, Student } from "../models/schema.js";
import mongoose from "mongoose";

export const createMentor = async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    await newMentor.save();
    res
      .status(200)
      .json({ message: "Mentor created successfully", data: newMentor });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
export const createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res
      .status(200)
      .json({ message: "Student created successfully", data: newStudent });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
export const assignStudentToMentor = async (req, res) => {
  try {
    const { studentIds } = req.body;
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (!student) {
        return res
          .status(500)
          .json({ message: "Student with ID ${studentId} not found." });
      }
      // const isMentorAvailable = student.mentor;
      // if (student.mentor.length)
      if (!student.mentor || student.mentor.length === 0) {
        return res
          .status(500)
          .json({ message: `Student ${student.name} already has a mentor.` });
      }
      student.mentor = mentorId;
      await student.save();
      mentor.students.push(studentId);
      await mentor.save();
    }

    res.status(200).json({
      message: "Students added to the mentor successfully",
      data: mentor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const changeMentorForStudent = async (req, res) => {
  const { mentorId } = req.body;
  const studentId = req.params.studentId;

  try {
    // Validate mentorId
    if (!mongoose.Types.ObjectId.isValid(mentorId)) {
      return res.status(400).json({ message: "Invalid mentorId" });
    }

    // Find the student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Save the current mentor as the previous mentor
    if (student.mentor) {
      student.prevMentor = student.mentor;
    }

    // Remove the student from the previous mentor's list, if any
    let previousMentor;
    if (student.mentor) {
      previousMentor = await Mentor.findById(student.mentor);
      if (previousMentor) {
        previousMentor.students.pull(studentId);
        await previousMentor.save();
      }
    }

    // Assign the student to the new mentor
    student.mentor = mentorId;
    await student.save();

    // Add the student to the new mentor's list
    const newMentor = await Mentor.findById(mentorId);
    if (newMentor) {
      newMentor.students.addToSet(studentId);
      await newMentor.save();
    }

    res.status(200).json({
      message: "Mentor changed for particular student successfully",
      studentDetail: student,
      previousMentor: previousMentor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

///To get  All students for perticular mentor

export const allStudentsForOneMentor = async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    const students = await Student.find({ mentor: mentorId });
    res.status(200).json({
      message: "Fetched successfully",
      data: students,
      mentorDetails: mentor,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const previousMentor = async (req, res) => {
  const studentId = req.params.studentId;

  try {
    // Find the student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the previous mentor
    const previousMentorId = student.prevMentor;
    if (!previousMentorId) {
      return res.status(404).json({ message: "Previous mentor not found" });
    }

    const previousMentor = await Mentor.findById(previousMentorId);
    if (!previousMentor) {
      return res.status(404).json({ message: "Previous mentor not found" });
    }

    res
      .status(200)
      .json({
        message: "Previous mentor Fetched successfully",
        data: previousMentor,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
