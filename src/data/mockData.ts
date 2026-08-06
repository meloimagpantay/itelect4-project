// src/data/mockData.ts -- NEW FILE
// Session 5 kept `student` and `course` at the top of App.tsx. Several
// pages need that data now, so it moves into its own file.
import type { User, Course, Submission } from "../types/index";
 
export const student: User = {
  id: 1, name: "Juan dela Cruz", email: "juan@example.com",
  role: "student", isActive: true,
};
 
export const allCourses: Course[] = [
  { code: "ITELECT4", title: "IT Elective 4",
    units: 3, semester: "1st Semester 2026-2027" },
  { code: "ITELECT3", title: "IT Elective 3",
    units: 3, semester: "2nd Semester 2025-2026" },
  { code: "CSSWENG", title: "Software Engineering",
    units: 3, semester: "1st Semester 2026-2027" },
];
 
export const allSubmissions: Submission[] = [
  { id: 1, studentId: 1, courseCode: "ITELECT4",
    repoUrl: "github.com/juan/itelect4-project",
    submittedAt: new Date(), score: 95 },
  { id: 2, studentId: 1, courseCode: "ITELECT3",
    repoUrl: "github.com/juan/itelect3-final",
    submittedAt: new Date() },
];
