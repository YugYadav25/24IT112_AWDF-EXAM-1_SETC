const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require("docx");

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "Charotar University of Science and Technology",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "Chandubhai S. Patel Institute of Technology (CSPIT)",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "Department of Information Technology / Computer Engineering",
                    heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({ text: "" }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Course: ", bold: true }),
                        new TextRun("ITUE301: Advanced Web Development Frameworks")
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Examination: ", bold: true }),
                        new TextRun("Open-Book Practical Examination | B.Tech. Semester 5 | AY 2026–27")
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Date: ", bold: true }),
                        new TextRun("24 / 08 / 2026")
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: "Set: ", bold: true }),
                        new TextRun("C (Employee Leave Management System)")
                    ]
                }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "Roll Number: [ENTER YOUR ROLL NUMBER HERE]", bold: true }),
                new Paragraph({ text: "Batch: [ENTER YOUR BATCH HERE]", bold: true }),
                new Paragraph({ text: "GitHub Repository Link: [ENTER YOUR GITHUB LINK HERE]", bold: true }),
                new Paragraph({ text: "Final Commit SHA: [ENTER YOUR COMMIT SHA HERE]", bold: true }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "1. Project Overview", heading: HeadingLevel.HEADING_1 }),
                new Paragraph({
                    text: "The Employee Leave Management System is a full-stack web application designed to digitize leave requests for TechSolutions Pvt Ltd. "
                }),
                new Paragraph({ text: "- Frontend: Built with React.js, utilizing Context API for global state management and React Router for protected, lazy-loaded navigation." }),
                new Paragraph({ text: "- Backend: Built with Express.js, featuring RESTful endpoints, JWT-based authentication via an authGuard middleware, and global error handling." }),
                new Paragraph({ text: "- Database: Built with MongoDB and Mongoose, implementing schema-level validations and relational referencing between Employees, LeaveTypes, and LeaveRequests." }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "2. Implementation Screenshots", heading: HeadingLevel.HEADING_1 }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "A. MyLeavesPage with Status-Badge Cards", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: "(This screenshot demonstrates the React frontend successfully fetching leave requests from the Express API using Axios, and rendering them via the reusable LeaveRequestCard component. Notice the dynamically colored status badges.)", italics: true }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "[ 📸 PASTE YOUR BROWSER SCREENSHOT HERE ]", bold: true }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "B. Postman Showing 201 Created on Leave Creation", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: "(This screenshot demonstrates the POST /api/v1/leaves endpoint successfully accepting a valid JWT token, validating the requested days against the employee's leave balance, creating the document, and returning a 201 Created HTTP status.)", italics: true }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "[ 📸 PASTE YOUR POSTMAN SCREENSHOT HERE ]", bold: true }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "C. MongoDB Showing a Saved Document", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: "(This screenshot demonstrates the backend successfully persisting data into the leave-management MongoDB database. The Mongoose schema successfully enforced the required fields and enum constraints.)", italics: true }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "[ 📸 PASTE YOUR MONGODB COMPASS SCREENSHOT HERE ]", bold: true }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "3. Technical Highlights", heading: HeadingLevel.HEADING_1 }),
                new Paragraph({ text: "React Component Architecture", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: "The application UI is broken down into modular components. The LeaveRequestCard accepts props (fromDate, toDate, days, leaveType, status) to dynamically render individual leave requests, ensuring DRY (Don't Repeat Yourself) principles." }),
                new Paragraph({ text: "Routing & State Management", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: "Global authentication state (token, role, employee) is managed using AuthContext. Protected routes verify this token before rendering. To optimize performance, the HR Panel is lazy-loaded using React.lazy and Suspense." }),
                new Paragraph({ text: "REST API & Middleware", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: "The Express backend utilizes custom middleware. A requestLogger tracks incoming traffic, while an authGuard intercepts protected routes to parse and validate JWT headers. A global error handler intercepts Mongoose validation errors and formats them into clean JSON responses." }),
                new Paragraph({ text: "MongoDB Schema Validation", heading: HeadingLevel.HEADING_2 }),
                new Paragraph({ text: "The LeaveRequest schema enforces enum validations on the status field (pending, approved, rejected, cancelled) and utilizes Mongoose ObjectId references to link requests to specific employees and leave types." })
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("C:/24IT112_AWDF-EXAM-1_SETC/Exam_Report_Set_C.docx", buffer);
    console.log("Created Document");
});
