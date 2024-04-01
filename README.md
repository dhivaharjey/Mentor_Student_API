##

# API Endpoints

1. Create Mentor

- Endpoint: /ms/create_mentor
- Method: POST
- Description: Creates a new mentor.

2. Create Student

- Endpoint: /ms/create-student
- Method: POST
- Description: Creates a new student.

3. Assign students to particular Mentor

- Endpoint: /ms/mentors/:mentorId/add-students
- Method: PUT
- Description: Assign students to particular Mentor.

4. Assign or Change a Mentor to particular Student

- Endpoint: /ms/students/:studentId/assign-mentor
- Method: PUT
- Description: Assign or Change a Mentor to particular Student-.

5. Show All Students for Mentor

- Endpoint: /ms/mentors/:mentorId/all-students
- Method: GET
- Description: Retrieves all students assigned to a mentor.

6. Show Previous Mentor for Student

- Endpoint: /ms/students/:studentId/previous-mentor
- Method: GET
- Description: Retrieves the previous mentor for a particular student.

- Deployed in [render](https://render.com/)
- Click here to see [API DOCUMENT LINK]()
