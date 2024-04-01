import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
  name: String,

  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const studentSchema = mongoose.Schema({
  name: String,
  course: String,
  mentor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }],
  prevMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
  },
});
export const Mentor = mongoose.model("Mentor", mentorSchema);

export const Student = mongoose.model("Student", studentSchema);
