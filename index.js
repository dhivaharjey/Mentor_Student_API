import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/db.js";
import routers from "./routers/mentorStudentRouter.js";

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.get("/", (req, res) => {
  res.status(200).send(
    `<div>


<div style="text-adivgn: center; background-color:blue;  padding: 10px;"><h1> NodeJS Hall Booking</h1></div>
    <div>

    <div>
    <h3><mark style="background-color:red">POST:</mark> Use the endpoint<mark style="background-color:red">
    /ms/create_mentor</mark> to create New mentor</h3>
    </div>

    <div>
    <h3><mark style="background-color:divght green">POST:</mark> Change the endpoint<mark style="background-color:divght green">/ms/create_student</mark> to Create a New student</h3>
    </div>

    <div>
    <h3><mark style="background-color:blue">PUT:</mark> Change the endpoint<mark style="background-color:blue">/ms/mentors/:mentorId/add-students</mark> to Add students for particular mentor</h3>
    </div>

    <div>
    <h3><mark style="background-color:grey">PUT:</mark> Change the endpoint<mark style="background-color:grey">
    /ms/students/:studentId/assign-mentor</mark> to assign or change mentor for particular student</h3>
    </div>

    <div>
    <h3><mark style="background-color:violet">GET:</mark> Change the endpoint<mark style="background-color:violet">/ms/mentors/:mentorId/all-students</mark> to retrieve all the students for particular mentor</h3>
    </div>

    <div>
    <h3><mark style="background-color:orange">GET:</mark> Change the endpoint<mark style="background-color:orange">/ms/students/:studentId/previous-mentor</mark> to retrieve prevous mentor for particular student</h3>
    </div>


    </div>
  </div>`
  );
});
app.use("/ms", routers);
app.listen(port, () => {
  console.log("App is running on the port", port);
});
