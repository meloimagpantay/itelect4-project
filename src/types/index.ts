// ===== INTERFACES (Session 1) =====
// An interface defines the SHAPE of an object -- what fields it must have.

export interface User {
  id:       number;
  name:     string;
  email:    string;
  role:     "student" | "admin" | "instructor"; // only these values
  isActive: boolean;
}

export interface Course {
  code:     string;
  title:    string;
  units:    number;
  semester: string;
}

export interface Submission {
  id:          number;
  studentId:   number;
  courseCode:  string;
  repoUrl:     string;
  submittedAt: Date;
  score?:      number;  // ? means this field is optional
}

// ===== TYPE ALIASES (Session 1) =====
// A type alias gives a name to any type -- primitives, unions, functions, objects

// Alias for a union type (string OR number)
export type ID = number | string;

// Alias for an object shape
export type Coordinate = {
  x: number;
  y: number;
};

// Alias for a function signature
export type Formatter = (value: number) => string;

// ===== UNION TYPES -- One OR the other (Session 1) =====
export type StringOrNumber = string | number;
export type Status         = "pending" | "active" | "inactive"; // literal union

// Function that accepts a union type
export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

// ===== INTERSECTION TYPES -- combines ALL properties (Session 1) =====
// StudentWithCourse must have all User fields AND enrolledCourse AND gpa
export type StudentWithCourse = User & {
  enrolledCourse: Course;
  gpa:            number;
};

// ===== GENERIC INTERFACE (Session 2) =====
// ApiResponse<T> can wrap ANY data type -- every future GT reuses this
export interface ApiResponse<T> {
  success: boolean;
  data:    T;
  message?: string;
}

// ===== UTILITY TYPES (Session 2) =====
// Partial<T> -- every field becomes optional
export type UserUpdate = Partial<User>;

// Pick<T, K> -- keep ONLY the listed fields
export type UserPreview = Pick<User, "id" | "name" | "role">;

// Omit<T, K> -- keep every field EXCEPT the listed ones
export type PublicUser = Omit<User, "email" | "isActive">;

// Record<K, T> -- a fixed set of keys, each mapped to the same value type
export type RoleCount = Record<
  "student" | "admin" | "instructor",
  number
>;

// ===== ENUMS (Session 2) =====

// Regular enum -- exists at runtime; can be looped over or reverse-mapped
export enum SubmissionStatus {
  Pending,
  Graded,
  Late,
}

// const enum -- inlined at compile time, zero runtime overhead
export const enum Role {
  Student    = "student",
  Admin      = "admin",
  Instructor = "instructor",
}

// ===== SESSION 7: two types added below this line ======================
//
// NOTE: Everything above is Sessions 1-2, untouched. Submission is
//       still the single source of truth -- the two types below are
//       DERIVED from it with Omit.
// JSON has no Date, and json-server writes ids as strings. So what the
// API hands back is NOT the Submission shape you declared in Session 1.
// Both types below are DERIVED from it, so Submission stays the single
// source of truth -- add a field there and these two inherit it.
 
// Omit is from Session 2. The & intersection is from Session 1.
// ===== SESSIONS 7-8: two derived types, written for json-server ======
// export type ApiSubmission = Omit<Submission, "id" | "submittedAt"> & {
//   id:          string;   // json-server ids look like "z4U3v8og06g"
//   submittedAt: string;   // an ISO string, never a Date object
// };
//
// // What we SEND when creating one. No id yet -- the server makes it.
// export type NewSubmission = Omit<ApiSubmission, "id">;
//
// NOTE: studentId was still a number, because json-server stored
//       whatever it was handed. MongoDB stores an ObjectId and sends
//       back 24 hex characters, so that field moves into the Omit too.
// ===== SESSION 10: the same two types, matching the real API =========
export type ApiSubmission = Omit<
  Submission,
  "id" | "studentId" | "submittedAt"
> & {
  id:          string;   // 24 hex characters, from MongoDB's _id
  studentId:   string;   // the owner's _id, also 24 hex characters
  submittedAt: string;   // an ISO string, never a Date object
};
 
// What we SEND when creating one. Not Omit<ApiSubmission, "id"> any
// more: the server fills in studentId from the token and submittedAt
// from the schema default, so sending either one is at best ignored
// and at worst a lie. These two fields are the whole request body,
// and itelect4-backend's NewSubmissionBody is this same Pick.
export type NewSubmission = Pick<Submission, "courseCode" | "repoUrl">;
 
// What /api/auth/register sends back, and what sits inside the login
// reply. Same story as ApiSubmission: Session 1 said id was a number
// because there was no database to number the rows.
export type ApiUser = Omit<User, "id"> & {
  id: string;
};
 
// What /api/auth/login sends back. The token is the string that goes
// in the Authorization header on every request after this one.
export interface AuthReply {
  token: string;
  user:  ApiUser;
}
