// src/pages/CourseDetailPage.tsx -- the finished file
import { useQuery } from "@tanstack/react-query";        // <-- NEW
import { useParams, useNavigate } from "react-router";
import type { Course } from "../types/index";
import CourseCard from "../components/CourseCard";
import { fetchCourseByCode } from "../api/client";       // <-- NEW
// The mockData import is GONE -- allCourses no longer exists
 
function CourseDetailPage() {
  const { code } = useParams<{ code: string }>();   // UNCHANGED
  const navigate = useNavigate();                   // UNCHANGED
 
  // GONE: const course = allCourses.find((c) => c.code === code);
// ===== SESSION 6: a local .find(), plus its own undefined check ========
//   // Turn that string into a real Course object
//   const course = allCourses.find((c) => c.code === code);
//
//   // The URL is user input -- they can type anything. Handle that.
//   if (course === undefined) {
//     return (
//       <div className="rounded-lg bg-red-50 p-4 text-red-700">
//         No course found with code "{code}".
//       </div>
//     );
//   }
//
// NOTE: Both are gone. A bad code now makes fetchCourseByCode throw,
//       and isError catches it -- one error path instead of two.
// ===== SESSION 7: a query keyed by the code from the URL ===============
  // The code from the URL goes INTO the key, so /courses/CSSWENG and
  // /courses/ITELECT4 get one cache entry each instead of sharing one.
  const { data, isPending, isError, error } = useQuery<Course>({
    queryKey: ["courses", code],
    queryFn: () => fetchCourseByCode(code!),
    enabled: code !== undefined,      // do not run without a code
  });
 
  if (isPending) {
    return <div className="animate-pulse p-6">Loading course...</div>;
  }
  // REPLACES Session 6's `if (course === undefined)` block: a bad code
  // makes fetchCourseByCode throw, and the throw lands here instead.
  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900
        dark:text-white">{data.title}</h2>
      <div className="max-w-sm">
        <CourseCard course={data} />      {/* was course={course} */}
      </div>
      <button onClick={() => navigate("/courses")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm
          font-semibold text-white transition hover:bg-blue-700">
        Back to Courses
      </button>
    </div>
  );
}
export default CourseDetailPage;
