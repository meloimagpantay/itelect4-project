// src/data/mockData.ts -- the finished file
// allCourses and allSubmissions are DELETED. They live in db.json now,
// and the app fetches them instead of importing them.
//
// `student` stays. There is no /users endpoint and no real login until
// Module 4 -- the Dashboard's user is still hard-coded, on purpose.
import type { User } from "../types/index";
 
// ===== SESSION 6: the two exports db.json replaced =====================
// export const allCourses: Course[] = [
//   { code: "ITELECT4", title: "IT Elective 4",
//     units: 3, semester: "1st Semester 2026-2027" },
//   { code: "ITELECT3", title: "IT Elective 3",
//     units: 3, semester: "2nd Semester 2025-2026" },
//   { code: "CSSWENG", title: "Software Engineering",
//     units: 3, semester: "1st Semester 2026-2027" },
// ];
//
// export const allSubmissions: Submission[] = [
//   { id: 1, studentId: 1, courseCode: "ITELECT4",
//     repoUrl: "github.com/juan/itelect4-project",
//     submittedAt: new Date(), score: 95 },
//   { id: 2, studentId: 1, courseCode: "ITELECT3",
//     repoUrl: "github.com/juan/itelect3-final",
//     submittedAt: new Date() },
// ];
//
// NOTE: Both are in db.json now, and the app fetches them.
//       `student` below stays -- there is no /users endpoint yet.
// ===== SESSION 7: one export left ======================================
export const student: User = {
  id: 1, name: "Juan dela Cruz", email: "juan@example.com",
  role: "student", isActive: true,
};
 
// DashboardPage is the only file that still imports from here, and
// DashboardPage does not change at all today.
